









// import { createServer } from 'http';
const http=  require('http');
const mongoose=require('mongoose');
const server=http.createServer((req,res)=>{ 
    console.log("request has been madefrom browser to server");
    console.log(req);
    
});

// server.listen(3000,'localhost',()=>{
//     console.log('server is listening to port number 3000');

// });

server.listen(3000,function(){
    console.log("server is working");
})