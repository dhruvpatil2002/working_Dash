const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Node.js backend is running!');
});
app.post('/Signup',(req,res)=>{
    res.send('sucessfully added a new user')
});
app.post('/login',(req,res)=>{
    res.send('user login sucessfully')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});