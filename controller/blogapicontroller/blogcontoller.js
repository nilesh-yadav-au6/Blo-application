var User = require("../../models/User");

module.exports = {
    renderCreateBlog : function(req,res){
        res.render("createBlog" ,{name:req.user.name})
    },
    createUserBlog : function(req,res){
        var user = req.user.id;
        var blog = new User.Blog( {...req.body})
        blog.userId = req.user._id
        blog.save().then(function(doc){
            User.User.updateOne({_id:user} , {$push: { blog:blog}})
            .then(function(d){
                User.Blog.find({userId:user})
                .then(function(users){
                    console.log(users)
                    data = users
                    res.redirect("/dashboard")
                })
            }) 
        })
        .catch(function(err){
            console.log(err);
        })
    },
    renderBlog : function(req,res){
        console.log(data , "nilesh")
        res.send("nilesh")
    },
    renderUpdateBlog : function(req,res){
        var userId = req.user.id
        var puser = req.query.id
        User.User.findById({_id:userId})
        .then(function(doc){
          res.render("updateblog" , {todos:doc.blog[0], blogid:puser , length:doc.blog.length , name:doc.name})
        })
        .catch(function(err){
          console.log(err)
        })
    },

    updateblog: function(req,res){
        var blodid = req.params.blogId
        var title = req.body.title;
        var body = req.body.body;
        var logUserId = req.user.id
        User.Blog.updateOne({userId:logUserId , _id:blodid} ,{ $set: {title:title , body:body}} )
        .then(function(doc){
             User.Blog.find({userId:logUserId})
            .then(function(d){
              data = d
              res.redirect("/dashboard");
            })
        })
        .catch(function(err){
            console.log(err)
        })
    },
    deleteblog : function(req,res){
        var blodid = req.params.blogId
        var logUserId = req.user.id
        console.log(blodid)
        User.Blog.deleteOne({userId:logUserId})
        .then(function(d){
            User.Blog.find({userId:logUserId})
            .then(function(d){
              data = d
              res.redirect("/dashboard");
            })
        }).catch(function(err){
            console.log(err)
        })

    }
}