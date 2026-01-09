import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getMyBlogs,
  getSavedBlogs,
  likeBlog,
  saveBlog,
  updateBlog,
} from "../controllers/blogController.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();

blogRouter
  .route("/create-blog")
  .post(
    userAuth,
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    createBlog
  );
blogRouter
  .route("/update-blog/:blogId")
  .patch(
    userAuth,
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    updateBlog
  );

blogRouter.route("/data").get(getBlogs);
blogRouter.route("/saved-blogs").get(userAuth, getSavedBlogs);
blogRouter.route("/my-blogs").get(userAuth, getMyBlogs);
blogRouter.route("/:blogId").get(getBlog);
blogRouter.route("/delete-blog/:blogId").delete(userAuth, deleteBlog);
blogRouter.route("/like/:blogId").post(userAuth, likeBlog);
blogRouter.route("/save/:blogId").post(userAuth, saveBlog);

export default blogRouter;
