const express = require("express");
const path = require('path');

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const Menu = require(modelsPath + '/menu.js');
const User = require(modelsPath + '/user.js');

const Util = require("../functions.js");


const menuRouter = express.Router();

menuRouter.get("/menus", Util.isLoggedIn, async (req, res) => {
    Util.isAdminUser(req, res);

    const menus = await Menu.find();
    const names = [];
    for (let i = 0; i < menus.length; i++) {
        const user = await User.findOne({ _id: menus[i].user._id });
        names.push(user.name);
    }

    res.render('admin/menus', {
        pageName: 'All Menus',
        menus: menus,
        isLoggedIn: req.isLogged,
        username: req.user.username,
        names: names
    });
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

    const menu = new Menu({
        title: req.body.title,
        nickname: req.body.nickname,
        user: user,
    });
    menu.save((err, menu) => { if (err) console.log(err); });

    user.menus.push(menu);
    user.save((err, user) => {
        if (err) console.log(err)
        else return res.redirect('/users/' + user.username + "/menus");
    });
});

menuRouter.get('/users/:username/menus/:nickname', Util.isLoggedIn, async (req, res) => {
    console.log(req.params.nickname);
    const menu = await Menu.findOne({ nickname: req.params.nickname });
    const user = req.user;

    data = {
        username: user.username,
        isLoggedIn: req.isLogged,
        menu: menu,
        pageName: menu.title,
    }
    
    res.render("menus/menu", data);
    if (menus) { res.render("menus/menu", data);  }
    else { res.send("Menu Not Found"); }
});

module.exports = menuRouter;

   
