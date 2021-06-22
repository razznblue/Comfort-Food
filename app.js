const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

require('dotenv').config();

// Enables the use of ES6 import statements throughout our application. (ESM Package)
require = require("esm")(module/*, options*/);

const router = require("./routes.js");
const User = require('./src/models/user.js');
const Menu = require('./src/models/menu.js');
const Food = require('./src/models/food.js');

const app = express();


// Implement ejs tamplate engine to render html file from views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public/"));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'mySecret',
    saveUninitialized: true,
}))
// app.use(session({
//     secret: "mySecret",
//     resave: false,
//     saveUninitialized: true,
// }));
app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
app.use(express.json());

// Passport.js
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // Keep the session running when you switch pages, so you don't get logged out

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>  {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: "User Does not Exist. Incorrect Login Credentials." }); }

        bcrypt.compare(password, user.password, (err, res) => {
            if (err) { return done(err); }
            if (res === false) { return done(null, false, { message: "Incorrect Password." }) }

            return done(null, user);
        });
    })
}));


//FUNCTIONS
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { req.isLogged = true; return next(); }
    res.redirect("/login");
}
const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) { req.isLogged = false; return next(); }
    res.redirect("/");
}


// ROUTES
app.get("/", isLoggedIn, (req, res) => {
    const index = { pageName: "index", isLoggedIn: req.isLogged, }
    res.render("index", index);
});
app.get("/about", isLoggedIn, (req, res) => {
    const about = { pageName: "about", isLoggedIn: req.isLogged, }
    res.render("about", about);
});
app.get("/contact", isLoggedIn, (req, res) => {
    const contact = { pageName: "contact", isLoggedIn: req.isLogged, }
    res.render("contact", contact);
});

app.get("/login", isLoggedOut, (req, res) => {
    const login = {
        pageName: "login",
        isLoggedIn: req.isLogged,
        error: req.query.error,
    }
    res.render("login", login );
});
app.post("/login", passport.authenticate('local', { 
        successRedirect: "/", 
        failureRedirect: "/login?error=true"
    },
));

app.get('/logout', function(req, res){
    console.log('logging out');
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
    // req.logout();
    // res.redirect('/');
});

app.get("/signup", (req, res) => {
    const signup = { 
        pageName: "signup", 
        isLoggedIn: req.isLogged, 
        error: req.query.error,
    }
    res.render("signup", signup);
});

app.post("/signup", async (req, res) => {
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


// Setup Admin User
app.get("/setup", async (req, res) => {
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


// Connect To MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true, })
.then(
    () => { 
        console.log("Connected to mongoDB Succesfully!"); 
        app.use("/", router);

        // Start Server
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is listening on port 5000");
        });
    },
    err => { console.log(err) },
);
