const express = require("express");
const bcrypt = require('bcrypt');
const User = require('../src/models/user.js');
const Menu = require('../src/models/menu.js');
const Food = require('../src/models/food.js');
const Util = require("./functions.js");


module.exports = (passport) => {
    const router = express.Router();

    // GET REQUESTS
    router.get("/users", async (req, res) => {
        const users = await User.find();
        res.render('admin/users', {
            pageName: 'All Users',
            users: users,
            isLoggedIn: req.isLogged
        });
    });
    router.get("/profile", (req, res) => {
        res.redirect("/users/" + req.user.username);
    });
    router.get("/users/:username", Util.isLoggedIn, async (req, res) => {
        const user = await User.findOne({ username: req.params.username });
        const data = {
            username: req.params.username,
            email: user.email,
            dateJoined: user.createdAt,
            pageName: 'myProfile',
            isLoggedIn: req.isLogged
        }
        if (user) { res.render("profile", data); }
        else { res.send("User Not Found"); }
    });
    router.get("/myMenus", (req, res) => {
        res.redirect("/users/" + req.user.username + "/menus");
    });
    router.get("/users/:username/menus", Util.isLoggedIn, async (req, res) => {
        const user = await User.findOne({ username: req.params.username});
        const data = {
            username: req.params.username,
            menus: user.menus,
            pageName: 'myMenus',
            isLoggedIn: req.isLogged
        }
        if (user) { res.render("menu", data); }
        else { res.send("Menus Not Found"); }
    });

    router.get("/menus", async (req, res) => {
        const menus = await Menu.find();
        res.send(menus);
    });
    router.get("/foods", async (req, res) => {
        const foods = await Food.find();
        res.send(foods);
    });

    router.get("/", Util.isLoggedIn, async (req, res) => {
        const index = { pageName: "index", isLoggedIn: req.isLogged }
        res.render("index", index);
    });
    router.get("/about", Util.isLoggedIn, async (req, res) => {
        const about = { pageName: "about", isLoggedIn: req.isLogged }
        res.render("about", about);
    });
    router.get("/contact", Util.isLoggedIn, async (req, res) => {
        const contact = { pageName: "contact", isLoggedIn: req.isLogged }
        res.render("contact", contact);
    });

    router.get("/signup", Util.isLoggedOut, (req, res) => {
        const signup = { 
            pageName: "signup", 
            isLoggedIn: req.isLogged, 
            error: req.query.error,
        }
        res.render("signup", signup);
    });
    router.get("/login", Util.isLoggedOut, (req, res) => {
        const login = {
            pageName: "login",
            isLoggedIn: req.isLogged,
            error: req.query.error,
        }
        res.render("login", login );
    });
    router.get('/logout', function(req, res){
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    });
    router.get("/update", (req, res) => {
        res.redirect("/users/" + req.user.username + "/update");
    });
    router.get('/users/:username/update', Util.isLoggedIn, async (req, res) => {
        const user = await User.findOne({ username: req.params.username});
        const data = { 
            username: user.username,
            email: user.email,
            pageName: "update", 
            isLoggedIn: req.isLogged, 
            error: req.query.error,
        }
        if (user) { res.render("update", data); }
    })

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
                username: "admin",
                email: "kaiposemail@yahoo.com",
                password: hash,
            });
            adminUser.save();
            res.redirect("/");
        });
        });
    });


    // POST REQUESTS
    router.post("/login", passport.authenticate('local', { 
            successRedirect: "/", 
            failureRedirect: "/login?error=true"
        },
    ));

    router.post("/signup", async (req, res) => {
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
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                });
                user.save();
                res.redirect("/");
                console.log("Registered Successfully!");
            });
        });
    });

    router.post("/users/:username/update", async (req, res) => {
        let user = {}
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
                    res.redirect("/profile");
                    console.log("Registered Successfully!");
                });
            });
        });


    });

    // PATCH REQUESTS
    router.get("updateUser", (req, res) => {
        res.redirect("/users/" + req.user.username);
    });
    
    // DELETE REQUESTS
    router.delete("/users/:username/delete", (req, res) => {
        console.log("ROUTER.DELETE: deleting user...");
        let query = {username:req.params.username};
        User.remove(query, (err) => {
            if (err) console.log(err);
            res.send("User Deleted Successfully.")
        });
    });

    return router;
}