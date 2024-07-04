const router=require("express").Router();
const {registerController,loginController}=require("../controllers/authentication.controller.js")
router.post("/login",loginController);
router.post('/register',registerController)













module.exports=router;
//login
//register
//logout
//refresh



