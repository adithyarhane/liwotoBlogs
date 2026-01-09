import React, { useEffect, useState } from "react";
import EmailToForgotPassword from "../components/EmailToForgotPassword";
import VerifyResetOtp from "../components/VerifyResetOtp.jsx";
import NewPasswordForm from "../components/NewPasswordForm.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [resetOtp, setResetOtp] = useState("");

  const { isLoggedIn, userData } = useAuthContext();

  useEffect(() => {
    if (
      isLoggedIn &&
      userData &&
      location.pathname.includes("/reset-password")
    ) {
      navigate("/");
    }
  }, [isLoggedIn, userData]);

  return (
    <>
      {!isEmailSent && (
        <EmailToForgotPassword
          setIsEmailSent={setIsEmailSent}
          email={email}
          setEmail={setEmail}
        />
      )}
      {isEmailSent && !isOtpSubmitted && (
        <VerifyResetOtp
          setIsOtpSubmitted={setIsOtpSubmitted}
          setResetOpt={setResetOtp}
        />
      )}
      {isEmailSent && isOtpSubmitted && (
        <NewPasswordForm email={email} resetOtp={resetOtp} />
      )}
    </>
  );
};

export default ResetPassword;
