var express = require("express");
var session = require("express-session");
var methodOverride = require("method-override");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
require("./db")
var hbs = require("hbs");
var path = require("path");
var usernormalroter = require("./routes/userroutes/usernormalroutes")
var blogRoutes = require("./routes/blogroutes/blognormalrouts")
app.use(express.urlencoded({extended:false}))

app.use(methodOverride("_method"))
app.set("view engine" , "hbs");
app.set("view options", { layout: "main" });
hbs.registerPartials(path.join(__dirname, "views" , "partials"));


hbs.registerHelper('constructUpdateAPI', function() {
     return `/update/user/blog/${this.blogid}?_method=PATCH`;
   });

hbs.registerHelper("constructDelete" ,function(){
    return `/delete/user/blog/${this.blogid}?_method=DELETE`
})  
app.use(
    session({
        secret : 'The Budha has smiled',
        resave : false,
        name : 'MyBook',
        saveUninitialized : false,
        cookie : {
            maxAge : 1000 * 60 * 30,
            httpOnly : true,
            secure : false,
            sameSite : 'strict'
        }
    })
)

app.use(usernormalroter);
app.use(blogRoutes);

app.get("/" , function(req,res){
    res.render("index" ,{title:"Home Page"})
});

app.listen("1234",function(){
    console.log("Server running on 1234")
});