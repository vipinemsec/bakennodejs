const obj = {
    title: 'java',
    enroll() {
        console.log("work smart and hard");
    }
}

const obj1 = { ...obj };
obj1.title = "python";
// console.log(obj1);
for (let key in obj1) {
    // console.log(key, "key and value of object", obj1[key])
}

// to add new object in js
// using Object in js
const ob2 = {}
for (let key of Object.keys(obj)) {
    ob2[key] = obj[key];
}
console.log("for using Object in js",ob2)