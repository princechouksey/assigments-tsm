const jwt  = require("jsonwebtoken")
const User = require("../models/userModel");

const authMiddleware =async  (req,res,next)=>{
try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized, Please Login to continue"});
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    if(!decoded){
        return  res.status(400).json({message: "Invalid Token "})
    }
    const user = await User.findById(decoded.id)
    console.log(user);
    if(!user){
        return res.status(401).json({message : "No User Found"})
    }
    req.user = user;
    next();


} catch (error) {
console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Unauthorized. Invalid token." });
}    
}
module.exports = authMiddleware


