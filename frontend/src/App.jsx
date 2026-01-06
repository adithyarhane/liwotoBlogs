import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import BlogDetails from "./pages/BlogDetails";
import SavedBlogs from "./pages/SavedBlogs";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import VerifyAccount from "./pages/VerifyAccount";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/saved-blogs" element={<SavedBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
