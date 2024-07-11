const router=require("express").Router();
const {registerController,loginController, logoutController}=require("../controllers/authentication.controller.js")

//login Route
router.post("/login",loginController);
//Signup route
router.post('/register',registerController)
//Log outController
router.post("/logout",logoutController)













module.exports=router;
//login
//register
//logout
//refresh



