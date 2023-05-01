const superc1 = require("../DehasedApi/dehashed-superchoice.com.au.json");
const superc2 = require("../DehasedApi/superchoice.com.au.json");
const mongoose = require('mongoose')

// var Obj1= JSON.parse(superc2.message);
const collection = [...superc2.message["collection-1"], ...superc2.message["collection-4-eu"],
...superc2.message["collection-4-u"]];
// console.log(collection);
// console.log("length of arr in lookup", collection.length);
let set1 = new Set();
for (let item of collection) {
  if (set1.has(item.email_address)) {
    continue;
  }
  set1.add(item.email_address);
  set1.add(item.password);
  set1.add(item.indexed);
}
// console.log(set1);
let colobj = { "collection": Array.from(set1) }
let data_d = superc1.entries;
var obj = {};
for (let i of superc1.entries) {
  if (!Object.keys(obj).includes(i.database_name)) {
    obj = { ...obj, [i.database_name]: [] };

  }
  obj = { ...obj, [i.database_name]: [...obj[i.database_name], i] }
}


// console.log(obj);
let keys = Object.keys(obj);
let arr = [];
let set = new Set();

let result = [];

for (let item in obj) {
  for (let d of obj[item]) {
  }
}

for (let item in obj) {
  // console.log(item);
  // console.log(item.database_nam
  for (let doc in superc2.message) {
    let str1 = doc;
    let str2 = item;
    // sconsole.log(str1," and",str2)
    if (str1.toLowerCase().split('.')[0] === str2.toLowerCase().split('.')[0] ||
      str1.toLowerCase() === str2.toLowerCase()
      || str1.toLowerCase().split(' ')[1] === str2.toLowerCase().split(' ')[1]
    ) {
      for (let data of superc2.message[doc]) {
        if (set.has(data.email_address)) {
          continue;
        }
        let domain=`${doc}`
        // console.log("for data",data);
         data["data_base"]=domain
        // console.log("for my data",data);
        result.push(data);
        set.add(data.email_address);
        set.add(data.password)
      }
      // result={temp}

    } else {
      // console.log('false');
      // let temp1 = [];
      // temp1 = [...superc2.message[doc]];
      // result.push(temp1);
      for (let data of superc2.message[doc]) {
        if (set.has(data.email_address)) {
          continue;
        }
        result.push(data);
        set.add(data.email_address);
        set.add(data.password);
      }

    }
  }
}
// console.log("result for",result,"for size",result);


for (let item in superc2.message) {
  // console.log(item);
  // console.log(item.database_nam
  for (let doc in obj) {
    let str1 = doc;
    let str2 = item;
    // console.log(str1, " and", str2)
    if (str1.toLowerCase().split('.')[0] === str2.toLowerCase().split('.')[0] ||
      str1.toLowerCase() === str2.toLowerCase()
      || str1.toLowerCase().split(' ')[0] === str2.toLowerCase().split(' ')[0]
    ) {

      for (let data in obj) {

        for (let d of obj[data]) {

          if (set.has(d.email)) {
            continue;
          }
          result.push(d);
          set.add(d.email);
          set.add(d.password)
        }
      }
    } else {
      for (let data in obj) {

        for (let d of obj[data]) {

          if (set.has(d.email)) {
            continue;
          }
          result.push(d);
          // set.add(d.email);
          // set.add(d.password)
        }


      }

    }
  }
}

console.log("result for", "for size", result);
mongoose.connect('mongodb://127.0.0.1:27017/superFilter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // 30 second timeout
});
const leaksSchema = new mongoose.Schema({},
  {
    strict: false
  });

const superFilter = mongoose.model('superFilter', leaksSchema);
const db = async () => {


//  const db1 = new superFilter(result);
 for (let item of result) {
    const db1 = new superFilter(item);
    const p = await db1.save();
  }
  // const p = await db1.save();
  // console.log("we are saving tha data");
}
 db();

