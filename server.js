// JavaScript Document
const express = require("express");
const multer = require("multer");
const mysqlpool = require("./config/db");

const app = express();


//middleware
app.use(express.json());


//routes
app.use("/api/v1/student", require("./routes/studentsRoutes")); // name convention
app.get("/test", (req, res) => {

    res.status(200).send("<h1>Hello Nodesjs with Mysql app</h1>");
});

const PORT = 8080;

//condiioonally list'en
mysqlpool.query('SELECT 1').then(() => {

    // mysql 
    console.log("Mysql DB Connected");
    // listen to run app
    app.listen(PORT, () => {
        console.log("server running");

    });

}).catch((error) => {
    console.log(error);

})




