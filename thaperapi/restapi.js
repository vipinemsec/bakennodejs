



const express=require('express');
const app=express();

app.use(express.json());
require("../thaperapi/conn");

const MenUser=require("../thaperapi/schema");
const router=require("../thaperapi/router");
app.use(router);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("connection is working on port",port);
})