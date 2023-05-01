// const set = new Set();
const mongoose = require('mongoose')

// console.log(set);
// const obj = require("./leak-lookup-orica.com.json");

const superc1 = require("../DehasedApi/dehashed-superchoice.com.au.json");
const superc2 = require("../DehasedApi/oricamodel6.json");

// const myJsonString = JSON.stringify(orica2);
// const orica2obj = JSON.parse(myJsonString);
/*
// console.log(orica1obj);
// console.log(myJsonString.email)
const domainanme = [];
let index = 0;
for (let item in orica2.message) {
  // console.log(item);
    domainanme[index] = item;
    index = index + 1;

}
*/
// console.log(domainanme)


const map1 = new Map();
const map2 = new Map();
const map3 = new Map();
const set1 = new Set();
const set2 = new Set();


for (let item of superc1.entries) {
  // console.log(item.email_address);
  if (map1.has(item.email) && !map2.has(item.database_name)) {
    console.log("you are first if statement")
    map1.set(item.email, item)
    map2.set(item.database_name, item.email)
  }
  else if(map1.has(item) && item.database_name==undefined){
    // console.log("you are second if statement")
    // map1.set(item.email,item)
    map1.set(item.email,item);
    map2.set(item.database_name,item.email)
  }
  else {
    // console.log("you are else statement if statement")

    map1.set(item.email, item);
    map2.set(item.database_name, item.email)
  }

  set1.add(item);
}


for (let item of superc2.data) {
  // console.log(item.);
  if (map1.has(item.email_address) && !map2.has(item.database_name)) {
    // continue;
    map1.set(item.email_address, item)
    map2.set(item.database_name, item.email_address)
    console.log("you are first if statement")


  }

  else if(map1.has(item.email_address) && item.database_name==undefined){
    // map1.set(item.email_address,item)
    // console.log("you are second if statement")
    map1.set(item.email_address,item);
    map2.set(item.database_name,item.email_address)

  }
  else {
    // console.log("you are  else statement if statement")
    map1.set(item.email_address, item);
    map2.set(item.database_name, item.email_address);

  }
  // console.log(item.database_name)
  if(item.database_name==undefined){
    // console.log("working to uniqe data");
  }

  set2.add(item);
}

// console.log(map1);
// for(let item of orica2obj){
//   console.log(item.email);
// }
console.log("working to get unique data");
console.log("size of map1 is", map1.size);
console.log("size of map2 is", map2.size);
// console.log(map1)
console.log("size of set1 and set2->",set1.size,set2.size)
mongoose.connect('mongodb://127.0.0.1:27017/orica2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // 30 second timeout
});
const leaksSchema = new mongoose.Schema({},
  {
    strict: false
  });
const oricaFilter = mongoose.model('oricaFilter', leaksSchema);


const db = async () => {

  /*for (let name of domainanme) {
    for (let item of orica2.message[name]) {
      console.log(item);
      //  const ObjectData = JSON.stringify(item);
      //  console.log(ObjectData)
      //  console.log(value)
      const db = new oricaModel6(item);
      const p = await db.save();
      console.log("we are saving tha data");
    }
  }*/
  map1.forEach(async (values, keys) => {
    // console.log(values,keys)
    const db = new oricaFilter(values);
    const p = await db.save();
    console.log("we are saving tha data");


  })

}
//   db();
