const express = require("express");
const app = express();
const userRoutes  = require("./routes/userRoutes")
const cookieParser =require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json())

app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(morgan("combined"))
app.use("/user", userRoutes);
require('./config/passport'); 
app.use("/auth" ,authRoutes)

app.use(errorHandler)



module.exports = app;