const express = require("express");
const bcrypt = require('bcrypt');
const path = require('path');
const uploadToAWS = require("../aws/upload.js");

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const User = require(modelsPath + '/user.js');
const Menu = require(modelsPath + '/menu.js');

const upload = require("../upload.js");

const Util = require("../functions.js");

// set up path to environmental variables
const envPath = path.join(__dirname, '..', '..', '/.env');
require('dotenv').config({ path: envPath });
// set our variables
const BUCKET_NAME = process.env.BucketName;
const REGION = process.env.Region;

//const { Router } = require("express");

const userRouter = express.Router();

// <-- GET REQUESTS -->
userRouter.get("/users", Util.isLoggedIn, async (req, res) => {
    Util.isAdminUser(req, res);

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
        
    const url = Util.getProfilePicUrl(user, BUCKET_NAME, REGION);

    const data = {
        name: user.name,
        username: req.params.username,
        email: user.email,
        dateJoined: user.createdAt,
        pageName: 'myProfile',
        isLoggedIn: req.isLogged,
        message: req.session.message,
        profileImg: url
    }

    Util.isLoggedInUser(req, res);

    if (user) { res.render("profile", data);  delete req.session.message; }
    else { res.send("User Not Found"); }
        
    
});
userRouter.get("/myMenus", (req, res) => {
    res.redirect("/users/" + req.user.username + "/menus");
});
userRouter.get("/users/:username/menus", Util.isLoggedIn, async (req, res) => {
    const user = await User.findOne({ username: req.params.username});
    const menus = await Menu.find({ _id: { $in: user.menus} });

    const data = {
        username: req.params.username,
        menus: menus,
        pageName: 'myMenus',
        isLoggedIn: req.isLogged
    }

    Util.isLoggedInUser(req, res);

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

    Util.isLoggedInUser(req, res);
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

userRouter.post("/upload-profile-img", upload.single('profile-img'),  async (req, res) => {
    const user = await User.findOne({ username: req.user.username});

    // console.log(req.user);
    console.log(req.file);

    // Upload the actual file to AWS cloud storage
    const filePath = path.join(__dirname, '..', '..', 'public', 'img', 'profile-pics');
    uploadToAWS(req.file.filename, filePath);

    // Set new profileImg Src and define query
    user.profileImgPath = req.file.filename;
    let query = { username: req.user.username };
    
    // Update new user information in MongoDB Database
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