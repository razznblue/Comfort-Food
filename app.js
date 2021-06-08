const express = require("express");
const path = require("path");

const app = express();
const port = 3005;

const variables = {
    username: "driloves"
}

// Implement ejs tamplate engine to render html file from views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Tell our app to look in the styles folder for styling
app.use(express.static("public/styles"));

app.get("/", (req, res) => {
    res.render("index", variables);
});
app.get("/home", (req, res) => {
    res.send("Welcome To The Home Page!");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening on port 5000");
});