







const userSchema = mongoose.Schema({
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
 
 //model
 //userSchema.set('validateBeforeSave', false);
 
 
 const userModel = mongoose.model('userModel', userSchema);
 module.exports=userModel;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 