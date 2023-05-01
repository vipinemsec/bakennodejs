const superc1 = require("../DehasedApi/dehashed-superchoice.com.au.json");
const superc2 = require("../DehasedApi/superchoice.com.au.json");

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
// console.log(colobj);
const map1 = new Map();
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

let result = {};

for (let item in obj) {
  // console.log("for dehased");
  // console.log("for in obj",obj[item[0].email]);
  // console.log("for the key",item)
  // console.log(item.database_name)
  for (let d of obj[item]) {
    // console.log("inner loop");
    // console.log(d);
    // console.log(d.email)
    // console.log(d.database_name);
    // console.log(d.password);
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
      || str1.toLowerCase().split(' ')[0] === str2.toLowerCase().split(' ')[0]
    ) {
      //  console.log('true');
      //  console.log(str1,"and ",str2)
      let temp = [];
      for (let data of superc2.message[doc]) {
        if (set.has(data.email_address)) {
          continue;
        }
        temp.push(data);
        set.add(data.email_address);
        set.add(data.password)
      }
      result.doc = temp;

    } else {
      // console.log('false');
      let temp1 = [];
      for (let data of superc2.message[doc]) {
        /*
        if (set.has(data.email_address)) {
          continue;
        }
        arr.push(data);
        set.add(data.email_address);
        set.add(data.password)
      }*/
        temp1.push(data);


      }
      // console.log(doc.email_address)
      result= temp1;
    }
  }
}
console.log("result for",result);
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
        //  console.log('true');
        //  console.log(str1,"and ",str2)
        for (let data in obj) {

          for (let d of obj[data]) {

            if (set.has(d.email)) {
              continue;
            }
            arr.push(d);
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
            arr.push(d);
            set.add(d.email);
            set.add(d.password)
          }

        }

      }
      // console.log(doc.email_address)
    }
  }
  // arr.push(collection)
  // console.log(arr.length, "and ", set.size)
  // console.log(arr);
  for (let breachSite in superc2.message) {

    for (let doc of superc2.message[breachSite]) {
      let obj = {
        email: `${doc.email_address}`,
        database_name: `${breachSite}`
      }

      /* let jsonObj = JSON.stringify(obj);
  
       if (finalSet.size === 0 || !finalSet.has(jsonObj)) {
           let leak = {...doc, database_name: `${breachSite}`};
           finalSet.add(jsonObj);
           finalArr.push(leak);
       }*/

      // console.log(doc.email_address);
      // console.log(breachSite)
    }
  }
