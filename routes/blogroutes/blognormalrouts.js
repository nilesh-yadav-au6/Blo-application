var express = require("express");
var router = express();
var blogController = require("../../controller/blogapicontroller/blogcontoller");
var middleware = require("../../middleware/middleware")

router.get("/create/blog" , middleware , blogController.renderCreateBlog);

router.post("/create/user/blog/" , middleware , blogController.createUserBlog);

router.get("/dashboard" , middleware , blogController.renderBlog);

router.get("/blog/update/" , middleware , blogController.renderUpdateBlog);

router.patch("/update/user/blog/:blogId" , middleware , blogController.updateblog);

router.delete("/delete/user/blog/:blogId" , middleware , blogController.deleteblog)


module.exports = router;