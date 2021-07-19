const express = require("express");
const path = require('path');

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const Food = require(modelsPath + '/food.js');
const Menu = require(modelsPath + '/menu.js');

const Util = require("../functions.js");


const foodRouter = express.Router();

foodRouter.get("/foods", Util.isLoggedIn, async (req, res) => {
    const foods = await Food.find();
    res.send(foods);
});

foodRouter.get("/users/:username/menus/:nickname/foods/:_id", Util.isLoggedIn, async (req, res) => {
    const food = await Food.findOne({ _id: req.params._id });
    const menu = await Menu.findOne({ nickname: req.params.nickname });
    const user = req.user;
});

foodRouter.get("/new-food", Util.isLoggedIn, async (req, res) => {
    const username = req.user.username;
    res.redirect("/users/" + username + "/new-food");
});

foodRouter.get("/users/:username/new-food", Util.isLoggedIn, async (req, res) => {
    const data = { 
        pageName: "createFood", 
        isLoggedIn: req.isLogged, 
        error: req.query.error,
        username: req.user.username,
    }
    res.render("menus/createFood", data);
});

foodRouter.post("/users/:username/new-food", Util.isLoggedIn, async (req, res) => {
    const exists = await Food.exists({ _id: req.body._id });
    let user = req.user;

    if (exists) {
        console.log("Food Already Exists");
        res.redirect("/users/" + user.username + "/new-food?error-true");
        return;
    }

    const menu = await Menu.Find({ nickname: req.body.nickname });

    const food = new Food({
        name: req.body.title,
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
        menu: menu.nickname
    });
    food.save((err, menu) => { if (err) console.log(err); });

    menu.foods.push(food);
    menu.save((err, user) => {
        if (err) console.log(err)
        else return res.redirect('/users/' + user.username + "/menus");
    });
});

module.exports = foodRouter;