import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import BlogDetails from "./pages/BlogDetails";
import SavedBlogs from "./pages/SavedBlogs";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermAndConditions from "./pages/TermAndConditions";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId/:blogTitle" element={<BlogDetails />} />
        <Route path="blogs" element={<Blogs />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/saved-blogs" element={<SavedBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:blogId" element={<EditBlog />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermAndConditions />} />

        <Route path="/*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
