const express = require('express')




const userRouter = express.Router();
// app.use('/users', userRouter);
userRouter.route('/').get(getusers).post(postuser).patch(updateuser).delete(deleteuser)



userRouter
.route("/getcookies")
.get(getcookies);

userRouter
.route("/setcookies")


.get(setcookies);


function setcookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn==true')
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true});
    res.send("cookies has been set");

  }
  function getcookies(req,res){


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

async function getusers(req, res) {
  let allusers = await userModel.find();
  res.json({
    message: "list on all users",
    data: allusers
  })
}
async function postuser(req, res) {
  // console.log(req.body);
  // users=req.body.name
  let dataobj = req.body;
  let users = await userModel.create(dataobj);
  res.json({
    message: "message received successfully",
    data: users
    // users:req.body
  })
}

async function updateuser(req, res) {
  // console.log("req.body->", req.body);
  // users=req.body.name
   let datatoupdate=req.body;
   let user=await userModel.findOneAndUpdate({name:"vipin"},datatoupdate)
   console.log(user);
  // for(key in datatoupdate){
  // users[key]=datatoupdate[key];
  // }
  res.json({
    message: "data updated successfully",
    data:user
  })

}

 async function deleteuser(req, res) {
  // users={}
  let datatodelete=req.body;
  let user=await userModel.findOneAndDelete(datatodelete);
   console.log(user);
  res.json({
    message: "data deleted successfully",
    data:user
  })

}


module.exports=userRouter;