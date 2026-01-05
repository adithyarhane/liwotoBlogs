import blogModel from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, content, tags, coverImage } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and content are required",
      });
    }

    const blog = await blogModel.create({
      title,
      description,
      content,
      tags: tags || [],
      coverImage: coverImage || "",
      author: userId,
    });

    return res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({ isPublished: true })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return res.json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
