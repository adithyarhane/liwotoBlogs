import { useState, useEffect } from "react";
import { ShieldCheck, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyResetOtp = ({ setIsOtpSubmitted, setResetOpt }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

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

    const pasteArr = paste.split("");
    setOtp([...pasteArr, ...Array(6 - pasteArr.length).fill("")]);
    document.getElementById(`otp-${pasteArr.length - 1}`)?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const otpCode = otp.join("");

      if (otpCode.length !== 6) {
        setLoading(false);
        return;
      }

      setIsOtpSubmitted(true);
      setResetOpt(otpCode);

      setTimeout(() => {
        setLoading(false);
        navigate("/reset-password");
      }, 1500);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mb-32">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-4 rounded-full bg-emerald-500 text-white shadow mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-gray-500 mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
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
          <div className="flex items-center justify-between text-sm">
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
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }
            `}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          OTP is valid for a limited time.
        </p>
      </div>
    </div>
  );
};

export default VerifyResetOtp;
