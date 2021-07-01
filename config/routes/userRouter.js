const express = require("express");
const bcrypt = require('bcrypt');
const path = require('path');

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const User = require(modelsPath + '/user.js');


const Util = require("../functions.js");

const upload = require('../upload.js');
//const { Router } = require("express");

const userRouter = express.Router();

// <-- GET REQUESTS -->
userRouter.get("/users", Util.isLoggedIn, async (req, res) => {
    if (req.user.username !== "admin") {
        req.session.error = "Invalid Request";
        res.redirect("/");
    }
    const users = await User.find();
    res.render('admin/users', {
        pageName: 'All Users',
        users: users,
        isLoggedIn: req.isLogged,
        username: req.user.username
    });
});
userRouter.get("/profile", (req, res) => {
    res.redirect("/users/" + req.user.username);
});
userRouter.get("/users/:username", Util.isLoggedIn, async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const data = {
        name: user.name,
        username: req.params.username,
        email: user.email,
        dateJoined: user.createdAt,
        pageName: 'myProfile',
        isLoggedIn: req.isLogged,
        message: req.session.message,
        profileImg: user.profileImgPath
    }
    if (req.user.username !== req.params.username) {
        req.session.error = "Invalid Request";
        res.redirect("/profile");
    }
    if (user) { res.render("profile", data);  delete req.session.message; }
    else { res.send("User Not Found"); }
});
userRouter.get("/myMenus", (req, res) => {
    res.redirect("/users/" + req.user.username + "/menus");
});
userRouter.get("/users/:username/menus", Util.isLoggedIn, async (req, res) => {
    const user = await User.findOne({ username: req.params.username});
    const data = {
        username: req.params.username,
        menus: user.menus,
        pageName: 'myMenus',
        isLoggedIn: req.isLogged
    }
    if (req.user.username !== req.params.username) {
        req.session.error = "Invalid Request";
        res.redirect("/profile");
    }
    if (user) { res.render("menu", data); }
    else { res.send("Menus Not Found"); }
});
userRouter.get("/update", (req, res) => {
    res.redirect("/users/" + req.user.username + "/update");
});
userRouter.get('/users/:username/update', Util.isLoggedIn, async (req, res) => {
    const user = await User.findOne({ username: req.params.username});
    const data = { 
        name: user.name,
        username: user.username,
        email: user.email,
        pageName: "update", 
        isLoggedIn: req.isLogged, 
        error: req.query.error,
    }
    if (req.user.username !== req.params.username) {
        req.session.error = "Invalid Request";
        res.redirect("/profile");
    }
    if (user) { res.render("update", data); }
});

// <-- POST REQUESTS -->
userRouter.post("/signup", async (req, res) => {
    const exists = await User.exists({ username: req.body.username });
    if (exists) {
        console.log("User Already Exists");
        res.redirect("/signup?error=true");
        return;
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return next(err);
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: false,
            });
            user.save();
            res.redirect("/");
            console.log("Registered Successfully!");
        });
    });
});

userRouter.post("/users/:username/update", async (req, res) => {
    let user = {};
    user.name = req.body.name
    user.username = req.body.username;
    user.email = req.body.email;

    let query = { username: req.params.username };

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            User.update(query, user, (err) => {
                if (err) return next(err);
                req.session.message = "Updated Successfully!";
                res.redirect("/profile");
            });
        });
    });
});

userRouter.post("/upload-profile-img", upload.single('profile-img'), async (req, res) => {
    const user = await User.findOne({ username: req.user.username});

    // console.log(req.user);
    // console.log(req.file);

    user.profileImgPath = req.file.filename;
    let query = { username: req.user.username };

    User.update(query, user, (err) => {
        if (err) return next(err);
        req.session.message = "Updated Successfully!";
        res.redirect("/profile");
    });
});

// PATCH REQUESTS
userRouter.get("updateUser", (req, res) => {
    res.redirect("/users/" + req.user.username);
});

// DELETE REQUESTS
userRouter.delete("/users/:username/delete", (req, res) => {
    console.log("ROUTER.DELETE: deleting user...");
    let query = {username:req.params.username};
    User.remove(query, (err) => {
        if (err) console.log(err);
        res.send("User Deleted Successfully.")
    });
});


module.exports = userRouter;