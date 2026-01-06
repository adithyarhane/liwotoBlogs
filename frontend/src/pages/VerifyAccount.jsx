import React, { useState, useEffect } from "react";
import { MailCheck, ShieldCheck, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const VerifyAccount = () => {
  const { isLoggedIn, userData, verifyAccount } = useAuthContext();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    document.getElementById(`otp-${newOtp.length - 1}`)?.focus();
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-emerald-500 text-white shadow-lg mb-4">
            <MailCheck size={32} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {/* Info Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-sm mt-6">
          <ShieldCheck size={18} />
          This helps us keep your account secure
        </div>

        {/* OTP FORM */}
        <form className="mt-8" onSubmit={(e) => verifyAccount(e, otp)}>
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="
                  w-12 h-14 
                  text-center 
                  text-xl font-semibold 
                  rounded-xl 
                  border border-gray-300 
                  focus:border-emerald-500 
                  focus:ring-2 focus:ring-emerald-200 
                  outline-none 
                  bg-white
                "
              />
            ))}
          </div>

          {/* Timer / Resend */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <p className="text-gray-600">Didn’t receive the code?</p>

            {timer > 0 ? (
              <span className="text-gray-500">
                Resend in <strong>{timer}s</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(60)}
                className="flex items-center gap-1 text-emerald-600 font-medium hover:underline"
              >
                <RotateCcw size={14} /> Resend OTP
              </button>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-8 w-full h-12 
              bg-emerald-500 
              text-white 
              rounded-xl 
              font-semibold 
              hover:bg-emerald-600 
              transition
            "
          >
            Verify Email
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Check spam or promotions if you don’t see the email.
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
