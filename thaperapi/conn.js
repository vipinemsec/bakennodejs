 






 const mongoose =require('mongoose');
  mongoose.connect("mongodb://127.0.0.1:27017/Dehased1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("db is connected");
  }).catch((e)=>{
    console.log("error",e)
  })