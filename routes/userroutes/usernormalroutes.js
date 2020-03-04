var express = require("express");
var router = express();
var userapicontroller = require("../../controller/userapicontroller/usercontroller");
var middleware = require("../../middleware/middleware")

router.get("/register" , userapicontroller.renderRegisterPage );
router.post("/users/register" , userapicontroller.registerUser);
router.get("/login" , userapicontroller.renderLoginPage);
router.post("/users/login" , userapicontroller.loginUser);
router.get("/dashboard" , userapicontroller.renderDashBoard);
router.get("/user/logout" , middleware, userapicontroller.logOutUser)

module.exports = router;