import cv2
import base64
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO

app = FastAPI()

# Allow frontend origin for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8m.pt")

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, room: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[room] = websocket

    def disconnect(self, room: str):
        if room in self.active_connections:
            del self.active_connections[room]

    def get(self, room: str):
        return self.active_connections.get(room)

manager = ConnectionManager()

@app.websocket("/ws/detect/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(room_id, websocket)
    cap = None
    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            video_url = data.get("video_url")

            if action == "start" and video_url:
                if cap is not None:
                    cap.release()
                cap = cv2.VideoCapture(video_url)
                if not cap.isOpened():
                    await websocket.send_json({"message": f"Failed to open video source: {video_url}"})
                    continue

                while cap.isOpened():
                    try:
                        ret, frame = await asyncio.to_thread(cap.read)
                        if not ret:
                            await asyncio.sleep(0.1)
                            continue

                        results = await asyncio.to_thread(model, frame)
                        boxes = results[0].boxes.cpu().numpy() if results else []

                        for box in boxes:
                            cls_id = int(box.cls[0])
                            if cls_id == 0:  # person class
                                x1, y1, x2, y2 = map(int, box.xyxy[0])
                                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

                        _, buffer = cv2.imencode('.jpg', frame)
                        frame_str = base64.b64encode(buffer).decode('utf-8')

                        await websocket.send_json({"frame": frame_str})
                        await asyncio.sleep(0.05)  # 20 FPS approx

                    except Exception as e:
                        print(f"Inference/frame processing error: {e}")
                        await websocket.send_json({"message": f"Backend error: {e}"})
                        break

            elif action == "stop":
                if cap is not None:
                    cap.release()
                    cap = None
                await websocket.send_json({"message": "Detection stopped."})

    except WebSocketDisconnect:
        manager.disconnect(room_id)
        if cap is not None:
            cap.release()
