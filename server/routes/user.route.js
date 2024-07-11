const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController,
  refreshController,
} = require("../controllers/authentication.controller.js");
const auth = require("../middleware/auth.middleware.js");

//login Route
router.post("/login", loginController);
//Signup route
router.post("/register", registerController);
//Log outController
router.post("/logout", auth, logoutController);
//refresh route
router.get("/refresh", refreshController);



module.exports = router;
//login
//register
//logout
//refresh
