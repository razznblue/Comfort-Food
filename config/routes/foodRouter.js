const express = require("express");
const bcrypt = require('bcrypt');

const User = require('/Users/kaipojames/Documents/Development/Node/ComfortFood.js/src/models/user.js');
const Menu = require('/Users/kaipojames/Documents/Development/Node/ComfortFood.js/src/models/menu.js');
const Food = require('/Users/kaipojames/Documents/Development/Node/ComfortFood.js/src/models/food.js');

const Util = require("../functions.js");


const foodRouter = express.Router();

foodRouter.get("/foods", Util.isLoggedIn, async (req, res) => {
    const foods = await Food.find();
    res.send(foods);
});

module.exports = foodRouter;