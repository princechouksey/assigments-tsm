// index.js
require('dotenv').config(); 
const app = require("./src/app");

const PORT = process.env.PORT || 3000;
console.log("Configured PORT:", PORT);

app.get("/", (req, res) => {
  console.log("Home route accessed");
  res.send("<h1>Welcome to Express Server</h1>");
});

app.get("/about", (req,res)=>{
  console.log("About Page");
  res.send("<h1>Welcome to ABOUT PAGE </h1>")
})
app.get("/user/:id", (req,res)=>{
  const userId = req.params.id
  res.send(`<h1>User ${userId} </h1>`);
  res.status(200)
  
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
