const express = require('express')
 


 const userModel=require('./models/userModel');



const authRouter = express.Router();
app.use("/auth", authRouter);

authRouter
  .route('/signup')
  .get(getsignUp)
  .post(postsignUp);


  authRouter
  .route('/login')
  .post(loginUser)

 async function loginUser(req,res){
    try
    {
    let data=req.body;
    let user= await userModel.findOne({email:data.email});
    if(user)
    {
        if(user.password==data.password)
        {
            return res.json({
                message:"User has logged in",
                userd:user
            })
        }else{
            return res.json({
                message:"Wrong data"
            })
        }

    }
    else{
       return res.json({
            message:"User not found"
        })
    }
}catch(error){
    return res.json({
        message:error.message
    })

}

}  

function getsignUp(req, res) {
    // res.send('');
    // res.sendFile('C:\Users\vipin\Desktop\Backend Nodejs\views\index.html');
    res.sendFile('./views/index.html', { root: __dirname })
  
  
  }
  
  async function postsignUp(req, res) {
    // let obj=req.body;
    try {
      let dataobj = req.body;
      console.log(req.body);
      // {"name":req.body.name,"email":req.body.email,"password":req.body.password,
      // /  "confirmpassword":req.body.confirmpassword};
      let user = await userModel.create(dataobj);
      // console.log("backend", obj);
      res.json({
        message: "user signed in",
        data: user
      })
    } catch (error) {
      console.log("this is error".error);
    }
  }

  module.exports=authRouter;