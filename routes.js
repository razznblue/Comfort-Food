const express = require("express");
const User = require('./src/models/user.js');
const Menu = require('./src/models/menu.js');
const Food = require('./src/models/food.js');
const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});
router.get("/menus", async (req, res) => {
	const menus = await Menu.find();
	res.send(menus);
});
router.get("/foods", async (req, res) => {
	const foods = await Food.find();
	res.send(foods);
});

// Create User
router.post("/signup", async (req, res) => {
    console.log("body: " + req.body);
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});
	await user.save();
	res.send(user);
});

module.exports = router;