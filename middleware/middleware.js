var User = require("../models/User");

module.exports = function(req,res,next){
    if(req.session.userId){
        User.User.findById(req.session.userId)
        .then(function(user){
            req.user = user;
            next();
        })
        .catch(function(err){
            console.log(err);
            res.redirect("/login");
        })
    } else res.redirect("/login")
}