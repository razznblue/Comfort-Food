const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const modelsPath = path.join(__dirname, '..', '..', 'src', 'models');
const User = require(modelsPath + '/user.js');

const Util = require("../functions.js");
const upload = require('../upload.js');

const userRouter = require("./userRouter.js");
const menuRouter = require("./menuRouter.js");
const foodRouter = require("./foodRouter.js");

module.exports = (passport) => {
    const router = express.Router();
    router.use('', userRouter);
    router.use('', menuRouter);
    router.use('', foodRouter);

    router.get("/", Util.isLoggedIn, async (req, res) => {
        const index = { pageName: "index", isLoggedIn: req.isLogged, error: req.session.error, username: req.user.username }
        res.render("index", index);
        delete req.session.error;
    });
    router.get("/about", Util.isLoggedIn, async (req, res) => {
        const about = { pageName: "about", isLoggedIn: req.isLogged, username: req.user.username }
        res.render("about", about);
    });
    router.get("/contact", Util.isLoggedIn, async (req, res) => {
        const contact = { pageName: "contact", isLoggedIn: req.isLogged, username: req.user.username }
        res.render("contact", contact);
    });
    
    router.get("/signup", Util.isLoggedOut, async (req, res) => {
        const signup = { 
            pageName: "signup", 
            isLoggedIn: req.isLogged, 
            error: req.query.error,
            username: "",
        }
        res.render("signup", signup);
    });
    router.get("/login", Util.isLoggedOut, async (req, res) => {
        const login = {
            pageName: "login",
            isLoggedIn: req.isLogged,
            error: req.query.error,
            username: ""
        }
        res.render("login", login );
    });
    router.get('/logout', function(req, res){
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    });

    // POST REQUESTS
    router.post("/login", passport.authenticate('local', { 
        successRedirect: "/", 
        failureRedirect: "/login?error=true"
    }, ));

    // Setup Admin User
    router.get("/setup", async (req, res) => {
        const exists = await User.exists({ username: "admin" });
        if (exists) {
            console.log("Exists");
            res.redirect("/");
            return;
        }
    
        bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash("password", salt, (err, hash) => {
            if (err) return next(err);
            const adminUser = new User({
                name: "Kaipo Wilmeth",
                username: "admin",
                email: "kaiposemail@yahoo.com",
                password: hash,
                isAdmin: true
            });
            adminUser.save();
            res.redirect("/");
        });
        });
    });

    return router;
}