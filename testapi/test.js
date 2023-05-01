var express = require('express');
// var mongodb = require('mongodb');
var app = express();

format = require('util').format;
var MongoClient = require('mongodb').MongoClient;
var db;
  app.listen(3000);
// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/Dehased1",{ useNewUrlParser: true,useUnifiedTopology: true, serverSelectionTimeoutMS: 30000  // 30 second timeout
}, async function(err, database) {
  if(err) throw err;

  db =  await database;

  // Start the application after the database connection is ready
//   app.listen(3000);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
console.log("for datbse",db)