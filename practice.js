const set = new Set();
const mongoose = require('mongoose')

// console.log(set);
const obj = require("./leak-lookup-orica.com.json");
const orica1 = require("./oricamodel2.json");
const orica2 = require("./oricamodel3.json");

const myJsonString = JSON.stringify(orica1);
const orica1obj=JSON.parse(myJsonString);
// console.log(orica1obj);
// console.log(myJsonString.email)
for(let item of orica1obj){
   console.log(item.email);
}
for (let item of orica1) {
  // set.add(item.);
  // console.log(item);
  if(!set.has(item.email)){
    set.add(item);
  }
}

for (let item1 of orica2) {
  if(!set.has(item1.email)){
    set.add(item1);
  }
}

console.log("working to get unique data");
console.log("size of set is", set.size);

  // console.log(setdata);

//  console.log(set);
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
const oricaModel4 = mongoose.model('oricaModel4', leaksSchema);

/*
for (let data of set) {

  const db = new oricaModel4(item);
  const p = await db.save();
  console.log("we are saving tha data");
}*/
// const set1=JSON.stringify(set);
const json = JSON.stringify(Array.from(set));

console.log(json.email);
/*
const db1 = async () => {

  for (const setdata of json) {

    const db = new oricaModel4({setdata});
    const p = await db.save();
    console.log("we are saving tha data");
  }

}

db1();
/*const domainanme = [];
let index = 0;
for (let item in obj.message) {
  // console.log(item);
  if ((typeof item) === 'string') {
    domainanme[index] = item;
    index = index + 1;

  }
}
// console.log(domainanme);

const db = async () => {

  for (let name of domainanme) {
    for (let item of obj.message[name]) {
      console.log(item);
      //  const ObjectData = JSON.stringify(item);
      //  console.log(ObjectData)
      //  console.log(value)
      const db = new oricaModel3(item);
      const p = await db.save();
      console.log("we are saving tha data");
    }
  }
}
db();*/
