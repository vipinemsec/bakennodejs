

const express = require('express')
var bodyParser = require('body-parser');
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const app = express()
// const port = 3000
// import axios from 'axios';

const CircularJSON = require('circular-json');

const axios=require('axios');
app.use(bodyParser.json());
app.use(express.json());
app.listen(3000);
// const userRouter = express.Router();
// app.use('/domain', userRouter);

// userRouter.route('/').get(domain)

/*async function domain(req,res){

    const url="https://api.dehashed.com/search?query=domain:'8Tracks.com'& size=10000 &page=1";
    const res1 = await axios.get(
		url,
		{
            auth:{
                username:'dev@emsec.uk',
                password: 'x23tlnd4eftupv8pjbrvihy7bp57cnwe'

            },
			headers: {
                'Accept':'application/json'
			}
		}
	);
    // console.log(res1);
    //  const res2= JSON.stringify(res1);
    const obj=CircularJSON.stringify(res1)
    return res.json({
        message:"working on domain api",
        data:obj
    })

}*/


app.get('/',(req,res)=>{
    res.send("you are workinhgto build api");
    console.log("working to build api");
})
//mongoose.connect("mongodb://127.0.0.1:27017/dehashedDb");
mongoose.connect('mongodb://127.0.0.1:27017/orica2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // 30 second timeout
});
const leaksSchema = new mongoose.Schema({},
{
        strict: false
});
const oricaModel2 = mongoose.model('oricaModel2', leaksSchema);
app.get('/domain', async (req,res)=>{
     const pageSize=Number.parseInt(req.body.pageSize);

    //  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
    console.log(typeof pageSize);
    const domainName = req.body.domain;
    const url=`https://api.dehashed.com/search?query=domain:${domainName}&size=30000 &page=${pageSize}`;
    const res1 = await axios.get(
		url,
		{
            auth:{
                username:'dev@emsec.uk',
                password: 'x23tlnd4eftupv8pjbrvihy7bp57cnwe'

            },
			headers: {
                'Accept':'application/json'
			}
		}
	);
    // console.log(res1);
    // const res2= JSON.stringify(res1);
    // const obj=CircularJSON.stringify(res1)
    const data=res1.data.entries;
    // const db=new userModel(data);
    for(const value of data){
        console.log(value)
       const db=new oricaModel2(value);
       const p= await db.save()
   }
    const balance=res1.data.balance;
    // console.log("my balance is->",balance);
    // const db=new userModel(data);
    // db.save();
    //  const p= await db.save()
    console.log("no of page",pageSize);
     res.json({
        message:"working on domain api",
        data1:data
    })

})
