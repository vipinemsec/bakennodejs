




const express=require('express');

const mongoose=require("mongoose");
const menSchema=new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
})

// we are creating collection
const MenUser=new mongoose.model("MenUser",menSchema);
module.exports=MenUser;
