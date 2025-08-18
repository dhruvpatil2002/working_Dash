

 require('dotenv').config({
     path:'./.env'
 });
 const express = require('express');
 const app = express();
 const cors=require('cors')
 const connectDB = require('./config/db.js');
const { url } = require('inspector');
// npm install body-parser
const bodyParser = require('body-parser');


connectDB();


 app.use(express.json());
 app.use(cors());
 app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use('/auth',require('./routes/authRoutes.js'))
app.get('/',(req,res)=>{
    res.send("welcome to ai surveillance dashboard")

})



const PORT = process.env.PORT || 8000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

