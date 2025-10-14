const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bf1 = Buffer.from("Hello");
const bf2 = Buffer.alloc(10);
console.log(bf2);
console.log(bf1);
bf2.write("Nodejs")
console.log(bf2.toString());
console.log(Buffer.concat([bf1, bf2]).toString());


module.exports = app