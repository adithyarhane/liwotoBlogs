/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BlogContext = createContext();
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const BlogContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState(false);
  const [myBlogs, setMyBlogs] = useState(false);

  const createBlog = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/blog/create-blog`,
        formData
      );
      if (res.data.success) {
        navigate("/my-blogs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/blog/data`);
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getBlogById = async (blogId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/blog/${blogId}`);
      if (res.data.success) {
        setCurrentBlog(res.data.blog);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSavedBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/blog/saved-blogs`);
      if (res.data.success) {
        setSavedBlogs(res.data.savedBlogs);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getMyBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/blog/my-blogs`);
      if (res.data.success) {
        setMyBlogs(res.data.blogs);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBlog = async (e, blogId) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/blog/save/${blogId}`);
      if (res.data.success) {
        getBlogById(blogId);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLikeBlog = async (e, blogId) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/blog/like/${blogId}`);
      if (res.data.success) {
        getBlogById(blogId);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateBlog = async (blogId, formData) => {
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/v1/blog/update-blog/${blogId}`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/my-blogs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/blog/delete-blog/${blogId}`
      );
      if (res.data.success) {
        getMyBlogs();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const value = {
    blogs,
    isLoading,
    handleSaveBlog,
    handleLikeBlog,
    getBlogById,
    currentBlog,
    getSavedBlogs,
    savedBlogs,
    getMyBlogs,
    myBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  return context;
};
