const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  commentCreate,
  getById,
} = require("../controllers/comment.controller.js");
//create
router.post("/comment",auth,commentCreate);
//read
router.get("/comment/:id",auth,commentCreate);
//read comment by blog id
