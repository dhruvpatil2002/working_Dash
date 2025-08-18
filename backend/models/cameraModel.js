const CameraSchema = new mongoose.Schema({
  siteRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  cameraId: String,
  status: String,
  type: String,
});
module.exports = mongoose.model('Camera', CameraSchema);