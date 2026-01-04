import express from "express";
import {
  login,
  logout,
  register,
  sendVerificationOtp,
  verifyAccount,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/send-verification-otp").post(userAuth, sendVerificationOtp);
authRouter.route("/verify-account").post(userAuth, verifyAccount);

export default authRouter;
