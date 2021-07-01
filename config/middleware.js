//const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const router = require("./routes/mainRouter.js")(passport);

const Middleware = (app, express) => {
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
    }));
    app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
    app.use(express.json());

    // Passport.js
    app.use(passport.initialize()); // initialize passport
    app.use(passport.session()); // Keep the session running when you switch pages, so you don't get logged out
    app.use("/", router);
}

module.exports = Middleware;