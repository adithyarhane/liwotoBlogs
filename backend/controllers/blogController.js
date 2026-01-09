import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, content, isPublished } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and content are required",
      });
    }
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const image = req.files.coverImage && req.files.coverImage[0];
    const images = [image];

    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return { url: result.secure_url, altText: "blog coverImage" };
      })
    );

    await blogModel.create({
      title,
      description,
      content,
      tags: tags,
      coverImage: imageUrl[0].url,
      author: userId,
      isPublished,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
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

export const getBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    // 1. Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    // 2. Find published blog
    const blog = await blogModel
      .findOne({
        _id: blogId,
      })
      .populate("author", "name");

    // 3. Handle not found
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

export const likeBlog = async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.params;

  try {
    // validate blodId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID." });
    }

    const blog = await blogModel.findById(blogId).populate("author", "name");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const isLiked = blog.likes.some((id) => id.toString() === userId);

    if (isLiked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: !isLiked,
      likesCount: blog.likes.length,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveBlog = async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await blogModel.findById(blogId).populate("author", "name");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Check if already saved
    const isSaved = blog.saves.some((id) => id.toString() === userId);

    if (isSaved) {
      // UNSAVE
      blog.saves = blog.saves.filter((id) => id.toString() !== userId);
    } else {
      // SAVE
      blog.saves.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      saved: !isSaved,
      blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSavedBlogs = async (req, res) => {
  const userId = req.user.id;

  try {
    const savedBlogs = await blogModel
      .find({ saves: userId, isPublished: true })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      const: savedBlogs.length,
      savedBlogs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog.",
      });
    }

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateBlog = async (req, res) => {
  const userId = req.user.id;
  const { blogId } = req.params;

  try {
    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ✅ Ownership check
    if (blog.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    const { title, description, content, isPublished } = req.body;

    // ✅ Parse tags safely
    let tags = blog.tags;
    if (req.body.tags) {
      tags = JSON.parse(req.body.tags);
    }

    // ✅ Update fields
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (content) blog.content = content;
    if (typeof isPublished !== "undefined") {
      blog.isPublished = isPublished;
    }
    if (tags) blog.tags = tags;

    // ✅ IMAGE UPDATE (SAFE, LOGIC SAME)
    if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
      const image = req.files.coverImage[0];
      const images = [image];

      const imageUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });

          return {
            url: result.secure_url,
            altText: "blog coverImage",
          };
        })
      );

      blog.coverImage = imageUrl[0].url;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBlogs = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const blogs = await blogModel
      .find({ author: userId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
