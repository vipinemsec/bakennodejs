









const express = require('express')
var bodyParser = require('body-parser');
const bcrypt=require('bcrypt');


const JWT_KEY='dfsdsffgfggjgkfgjkgjfgkfgjgjfdg';

const jwt=require('jsonwebtoken');
// const cookieParser=require('cookie-parser');

// app.use(cookieParser());
 const userModel=require('./models/UserModel1');
//  const userModel=require('models/userModel');
// const mongoose=require('mongoose')
const app = express()
// const port = 3000
app.use(bodyParser.json());




// app.use(express.json());
app.listen(3000);
/*
app.get('/', (req, res) => {
  console.log("server is working fucker vipin keep working to get better life");
  res.send('<h1>Hello vipin is everything wokimg fine<h1>');
  // res.sendFile('C:\Users\vipin\Desktop\Backend Nodejs\views\index.html');
  // res.end();
});
/*
app.get('/', (req, res) => {
  console.log("server is working fucker vipin keep working to get better life");
  res.send('<h1>Hello vipin is everything wokimg fine<h1>');
  // res.sendFile('C:\Users\vipin\Desktop\Backend Nodejs\views\index.html');
  // res.end();
});
app.get('/about', (req, res) => {
  console.log("server is working fucker vipin keep working to get better life");
  // res.send('<h1>About<h1>');
  // res.sendFile('C:\Users\vipin\Desktop\Backend Nodejs\views\index.html');
  // res.end();
  // res.sendFile('./views/index.html',{root:__dirname})
  res.sendFile('C:\Users\vipin\Desktop\Backend Nodejs\views\index.html');
});

let users={}
app.get('/users',(req,res)=>{
    res.send(users);
})

/// for post request to database
app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body.name
    res.json({
      message:"message received successfully",
      users:req.body
    })
});

// for update request

app.patch('/users',(req,res)=>{
  console.log("req.body->",req.body);
  // users=req.body.name
  let datatoupdate=req.body;
  for(key in datatoupdate){
    users[key]=datatoupdate[key];
  }
  res.json({
    message:"data updated successfully"
  })
});
 // delete in server
 app.delete('/users',(req,res)=>{
  users={}
  res.json({
    message:"data deleted successfully"
  })
});
*/
const userRouter = express.Router();
app.use('/users', userRouter);
userRouter.route('/').get(protectRoute,getusers).post(postuser).patch(updateuser).delete(deleteuser)



userRouter
.route("/getcookies")
.get(getcookies);

userRouter
.route("/setcookies")


.get(setcookies);
const authRouter =express.Router();
app.use("/auth", authRouter);

authRouter
  .route('/signup')
  .get(middleware,getsignUp)
  .post(postsignUp);

  authRouter
  .route('/login')
  .post(loginUser)

  function middleware(req,res,next){
    console.log("middleware");
    next();

  }

   let flag=true;

  function protectRoute(req,res,next){
     if(true){
      next();
     }
     else{
      return res.json({
        message:"User not logged in->Not allowed"
      })
     }

  }
 async function loginUser(req,res){
    try
    {
       let data=req.body;
       let user= await userModel.findOne({email:data.email});
    if(user)
    {
        if(user.password==data.password)
        {
          // let uid=user['_id'];
          // let token=jwt.sign({payload:uid,JWT_KEY});

          // console.log(token);

          // res.cookie('isLoggedIn',true);
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
  /* let obj=req.body;
  console.log("backend", obj);
   res.json({
    message:"user singed in",
    data:obj
   })*/
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
const mongoose = require('mongoose');
const emailvalidator=require('email-validator');
const cookieParser = require('cookie-parser');
console.log("you are in app js file");
const db_link = 'mongodb+srv://admin:WFz7ZPXD6FcsXG7H@cluster0.44kkndl.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose.connect(db_link, {
  useUnifiedTopology: true, useNewUrlParser: true

})
  .then(console.log(" vipin23456 db is working,mongodb connected successfully...."))
  .catch(err => console.log(err));

/*
const userSchema = mongoose.Schema({
  // userSchema.set('validateBeforeSave', false);

   name:{
    type:String,
    required:true
   },
   email:{ 
    type:String,
    required:true,
    validate:function(){
      return emailvalidator.validate(this.email);
    }
   },
   password:{
    type:String,
    required:true
   },
   confirmpassword:{
    type:String,
    validate:function(){
      return this.confirmpassword==this.password
    }
   }
});
*/

//model
//userSchema.set('validateBeforeSave', false);

//userSchema.pre('save',function(){
  // console.log("before saving in db");
  this.confirmpassword=undefined;
//});
//userSchema.pre('save',async function(){
  // console.log("before saving in db");
  // this.confirmpassword=undefined;
 // let salt=await bcrypt.genSalt();
 // let hashedstring= bcrypt.hash(this.password, salt);
 // this.password=hashedstring;
 // console.log(hashedstring);
//});

//userSchema.post('save',function(doc){
  // console.log("after saving in db",doc);
//});

//  const userModel = mongoose.model('userModel', userSchema);

/*(async function createuser() {
  let user = {
    name: "antra1111123",
    email: "antra111111136d@gmail.com",
    password: "123jj5j111111111116jj6789",
    confirmpassword: "11111111111111111111111"
  };
  let data = await userModel.create(user);
  console.log(data);
})();*/














