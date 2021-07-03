const functions = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) { req.isLogged = true; return next(); }
        res.redirect("/login");
    },
    isLoggedOut(req, res, next) {
        if (!req.isAuthenticated()) { req.isLogged = false; return next(); }
        res.redirect("/");
    },
    isAdminUser(req, res) {
        if (req.user.username !== "admin") {
            req.session.error = "Invalid Request";
            res.redirect("/");
        }
    },

    getProfilePicUrl(user, BUCKET_NAME, REGION) {
        const defaultprofilePic = "picture1.png";
        let url = "";
        if (user.profileImgPath === defaultprofilePic) {
            url = "/img/picture1.png";
        } else {
            url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${user.profileImgPath}`;
        }
        return url;
    },

    isLoggedInUser(req, res) {
        if (req.user.username !== req.params.username) {
            req.session.error = "Invalid Request";
            res.redirect("/profile");
        }
    }
}

module.exports = functions;