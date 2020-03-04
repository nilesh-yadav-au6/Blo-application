var User = require("../../models/User");
var bcrypt = require("bcryptjs");

module.exports = {

    renderRegisterPage: function(req,res){
        res.render("register" , {title : "Register"})
    },

    registerUser: function(req,res) {
        var user = new User.User({...req.body});
        user.save().then(function(user){
            req.session.userId = user._id;
            res.redirect("/login");
        })
        .catch(function(err){
            console.log(err);
            return res.status(500).send("Server error")
        })
    },

    renderLoginPage : function(req,res){
        res.render("login" , {title : "Login"})
    },

    loginUser: function(req,res){

        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password)
            return res .status(400).send("Invalid Credentials");

        User.User.findOne({email:email})
        .then(function (user) {
             req.session.userId = user._id;
             name = user.name;
             return  bcrypt.compare(password , user.password)
             })
               .then(function(isMatched){

                User.Blog.find({userId:req.session.userId})
                  .then(function(d){
                    data = d
                    if(!isMatched) return res.status(400).send("Invalid Credential");
                    res.redirect("/dashboard");
                  })
                    })
                    .catch(function(err){
                    console.log(err.message ,err);
                    res.redirect("/login");
                    })
    },
    renderDashBoard : function(req,res){
        res.render("dashboard" , {blog:data , name:name} )
    },

    logOutUser: function(req,res){
        console.log("567")
        req.session.destroy()
        return res.redirect('/')
    }
}