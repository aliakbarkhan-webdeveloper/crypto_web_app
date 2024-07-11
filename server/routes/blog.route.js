const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  blogCreation,
  getBlogs,
  findBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller.js");
//creating blog
router.post("/writeblog", auth, blogCreation);
//getting all blogs
router.get("/blogs",auth, getBlogs);
//get a specific blog
router.get("/blog/:id",auth, findBlog);
//update Blog
router.put("/blog",auth, updateBlog);
//delete Blog
router.delete("/blog",auth, deleteBlog);
module.exports = router;
