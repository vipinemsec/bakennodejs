










const express=require('express');
const router=new express.Router();
const MenUser=require("../thaperapi/schema");

router.post('/user', async (req,res)=>{
    try{
        const addnewdata=new MenUser(req.body);
        console.log(req.body);
       
       
       const insetruser=await addnewdata.save();
       res.status(201).send(insetruser);

    }catch(e){
        res.send(e);

    }
})


// get user with name to get data


router.get('/user/:name', async (req,res)=>{
    try{
        const name=req.params.name;
        const getmen1=await MenUser.find({name});
        res.status(201).send(getmen1);

    }catch(e){
        res.status(401).send(e);

    }
})


router.get('/user', async (req,res)=>{
    try{
        // const name=req.params.name;
       const getmen1=await MenUser.find({});
       res.status(201).send(getmen1);

    }catch(e){
        res.status(401).send(e);

    }
})
router.get('/', async(req,res)=>{
    res.send("you are in the thaper api");
})

module.exports=router;