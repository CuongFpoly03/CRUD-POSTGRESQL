const express = require("express");
const dotenv =require("dotenv");
const bodyparser = require("body-parser");
const {PrismaClient} = require("@prisma/client")
const route = require("./routes/web")
const cookieparser = require('cookie-parser');
dotenv.config();
const app = express();
const prisma = new  PrismaClient();
//connect bodyparser
//use form api
app.use(express.json()); //json
//use form form
app.use(express.urlencoded({extended: true}));

//connect coookiperser
app.use(cookieparser());

//connect route
app.use("/",route);

const port = process.env.PORT || 4001
app.listen(port, () => {
    console.log("run success !", port);
})