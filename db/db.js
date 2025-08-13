/*import { log } from "console";
import mongoose from "mongoose";
import express from "express"
const app=express()
(async()=>{
try {
     await mongoose.connect(`${process.env.MONGO_URI}`)
} catch (error) {
    console.log();
    
}
})() */

import mongoose from "mongoose";
import{DB_NAME} from"../db/constant.js"
 const connectDB=async()=>{
    try {
     const connecttionInstance=   await mongoose.connect(`${process.env.MONGO_URI}`)
     console.log(`\n mongodb connect !! db host:${connecttionInstance,connection.Host}`);
        
    } catch (error) {
      console.log("MONGODB connection error,error");
       process.exit(1) 
    }
 }