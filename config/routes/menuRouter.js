const express = require("express");
const bcrypt = require('bcrypt');
const path = require('path');

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const Menu = require(modelsPath + '/menu.js');

const Util = require("../functions.js");


const menuRouter = express.Router();

menuRouter.get("/menus", Util.isLoggedIn, async (req, res) => {
    const menus = await Menu.find();
    res.send(menus);
});

menuRouter.get("/create-menu", (req, res) => {
    res.redirect("/users/" + req.user.username + "/create-menu");
});
menuRouter.get("/users/:username/create-menu", Util.isLoggedIn, async (req, res) => {
    const data = { 
        pageName: "createMenu", 
        isLoggedIn: req.isLogged, 
        error: req.query.error,
        username: req.user.username,
    }
    res.render("menus/createMenu", data);
}); 

menuRouter.post("/create-menu", async (req, res) => {
    const exists = await Menu.exists({ nickname: req.body.nickname });
    if (exists) {
        console.log("Menu Already Exists");
        res.redirect("/users/" + req.user.username + "/menus?error=true");
        return;
    }
    let user = req.user;
    console.log(req.body.title);


    const menu = new Menu({
        title: req.body.title,
        user: user,
    });
    menu.save((err, menu) => {
        if (err) console.log(err);
    });

    console.log(menu);

    user.menus.push(menu);
    user.save((err, user) => {
        if (err) console.log(err)
        else return res.redirect('/users/' + user.username + "/menus");
    });
});

module.exports = menuRouter;

   
