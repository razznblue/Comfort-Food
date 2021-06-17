const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
require('dotenv').config();

// Enables the use of ES6 import statements throughout our application. (ESM Package)
require = require("esm")(module/*, options*/);

const models = require('./src/models/index.js');
const router = require("./routes.js");


const app = express();

// Variables to determine the active page(passed into their corresponding route below)
const index = {
    pageName: "index"
}
const about = {
    pageName: "about"
}
const contact = {
    pageName: "contact"
}
const signup = {
    pageName: "signup"
}
const login = {
    pageName: "login"
}

// Implement ejs tamplate engine to render html file from views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Tell our app to look in the public folder to access its contents
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



// ROUTES
app.get("/", (req, res) => {
    res.render("index", index);
});
app.get("/about", (req, res) => {
    res.render("about", about);
});
app.get("/contact", (req, res) => {
    res.render("contact", contact);
});
app.get("/signup", (req, res) => {
    res.render("signup", signup);
});
app.get("/login", (req, res) => {
    res.render("login", login);
});


// Connect To MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true, })
.then(
    () => { 
        console.log("Connected to mongoDB Succesfully!"); 
        app.use("/", router);

        // Start Server
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is listening on port 5000");
        });
    },
    err => { console.log(err) },
);
