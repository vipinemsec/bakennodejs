







const express = require('express')
const app = express()
// const port = 3000




app.listen(3000);
let users={}
app.get('/users',(req,res)=>{
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
});
