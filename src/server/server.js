const express = require("express");
const path = require("path");
const app = express();
const port = 3005;

app.get("/", (req, res) => {
    res.send("Hello there!");
    console.log("Hello there!");
});
app.get("/home", (req, res) => {
    res.send("Welcome To The Home Page!");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});