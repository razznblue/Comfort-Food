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

module.exports = menuRouter;

   
