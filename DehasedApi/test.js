const express = require("express");
const ds = require("./dehashed-superchoice.com.au.json");
const lld = require("../DehasedApi/superchoice.com.au.json");

const app = express();
app.use(express.json());

var data_d = ds.entries;
var finalSet = new Set();
var finalArr = [];

// total 30 & unique 26
for (var i = 0; i < data_d.length; i++) {
    let obj = {
        email: `${data_d[i].email}`,
        database_name: `${data_d[i].database_name}`
    }
    let jsonObj = JSON.stringify(obj);
    if (finalSet.size === 0 || !finalSet.has(jsonObj)) {
        finalArr.push(data_d[i]);
        finalSet.add(jsonObj);
    }
}

// total 153 & unique 129
for (var breachSite in lld.message) {
    
    for (var doc of lld.message[breachSite]) {
        let obj = {
            email: `${doc.email_address}`,
            database_name: `${breachSite}`
        }

        let jsonObj = JSON.stringify(obj);

        if (finalSet.size === 0 || !finalSet.has(jsonObj)) {
            let leak = {...doc, database_name: `${breachSite}`};
            finalSet.add(jsonObj);
            finalArr.push(leak);
        }

        console.log(doc.email_address);
        console.log(breachSite)
    }
}

console.log(finalArr.length,finalSet.size);
//console.log(finalArr);

var data = finalArr;
var obj = {};
for (let i of data) {
    if(!Object.keys(obj).includes(i.database_name)){
        obj = { ...obj, [i.database_name]: [] };
    }
 obj = { ...obj, [i.database_name]: [...obj[i.database_name], i]}
}
console.log(obj);
//let jsonObj = JSON.stringify(obj);
//console.log(jsonObj);

// const userInput = "linkedin"; // this can be replaced with user input
// //const regex = new RegExp(`(www\\.)?${userInput.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}[.-]?com$`, "i");


// const linkedinKeyword = 'linkedin';
// const regex = new RegExp(`(${linkedinKeyword}(-{1,2}| )|(www\\.)?${linkedinKeyword}(\\d)?\\.com)`, 'i');



// const str1 = "www.linkedin.com";
// const str2 = "Linkedin";
// const str3 = "www.Linked-in1.com";
// const str4 = "LinkedIN";

// console.log(regex.test(str1));
// console.log(regex.test(str2)); 
// console.log(regex.test(str3)); 
// console.log(regex.test(str4)); 
