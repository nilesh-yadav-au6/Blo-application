var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/User" , { useNewUrlParser:true ,useUnifiedTopology:true ,useCreateIndex:true})
.then(function (){
    console.log("Database Started")
})
.catch(function(err){
    console.log(err)
})