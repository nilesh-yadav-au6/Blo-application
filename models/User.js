var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var userSchema = new Schema({

name:{
    type:String
},
email:{
    type:String
},
password:{
    type:String
},
blog:[{
    type:Object
}]
} , {timestamps:true});

var blogSchema = new Schema({

    title:{
        type:String
    },
    body:{
        type:String
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref:"user"
    }
} , { timestamps:true});

userSchema.pre("save" , function(next){

    var user = this;

    if(user.isModified("password")){

        bcrypt.hash(user.password , 10)
              .then(function(hashedPassword){
                  user.password = hashedPassword;
                  next();  
              }) 
              .catch(function(err){
                  console.log(err);
                  next(err)
              }) 
    } else next();
})


var User = mongoose.model("user" , userSchema);
var Blog = mongoose.model("blog" , blogSchema);


module.exports = {User , Blog }