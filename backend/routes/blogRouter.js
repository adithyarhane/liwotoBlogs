import express from "express";
import {
  createBlog,
  getBlog,
  getBlogs,
  getSavedBlogs,
  likeBlog,
  saveBlog,
} from "../controllers/blogController.js";
import userAuth from "../middleware/userAuth.js";

const blogRouter = express.Router();

blogRouter.route("/create-blog").post(userAuth, createBlog);
blogRouter.route("/data").get(getBlogs);
blogRouter.route("/saved-blogs").get(userAuth, getSavedBlogs);
blogRouter.route("/:blogId").get(getBlog);
blogRouter.route("/like/:blogId").post(userAuth, likeBlog);
blogRouter.route("/save/:blogId").post(userAuth, saveBlog);

export default blogRouter;
