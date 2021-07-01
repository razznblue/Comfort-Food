const express = require("express");
const bcrypt = require('bcrypt');
const path = require('path');

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const Food = require(modelsPath + '/food.js');

const Util = require("../functions.js");


const foodRouter = express.Router();

foodRouter.get("/foods", Util.isLoggedIn, async (req, res) => {
    const foods = await Food.find();
    res.send(foods);
});

module.exports = foodRouter;