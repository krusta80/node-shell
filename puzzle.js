var startTime = new Date;

setTimeout(function() {
  var endTime = new Date;
  console.log('Time elapsed: ', endTime - startTime, 'ms');
}, 500);

while( new Date - startTime < 10501) {};
..$.$.$.$

Synchronous vs Asynchronous
Every method in fs module have synchronous as well as asynchronous form. Asynchronous methods takes a last parameter as completion function callback and first parameter of the callback function is error. It is preferred to use asynchronous method instead of synchronous method as former never block the program execution where as the second one does.

Example
Create a text file named input.txt having following content

Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
Let us create a js file named main.js having the following code.

var fs = require("fs");

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('input.txt');
.$.$