require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
const connectdb = require("./src/db/db")
const logger = require("./src/config/logger");

connectdb()

app.listen(PORT, ()=>{
    logger.info(`Listening to Server on the Port ${PORT}`);
})