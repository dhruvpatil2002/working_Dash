import dotenv from"dotenv"
import coonectDB from "./db/index.js";
import { connect } from "http2";
dotenv.config({
    path: './env'
})
connectDB()