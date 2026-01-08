import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const EmailToForgotPassword = ({ setIsEmailSent, email, setEmail }) => {
  const { sendResetOtp, isLoading } = useAuthContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mb-32">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-4 rounded-full bg-emerald-500 text-white shadow mb-4">
            <Mail size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-500 mt-2">
            Enter your email and we’ll send you a reset code
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => sendResetOtp(e, email, setIsEmailSent)}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2
              ${
                isLoading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }
            `}
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Reset Code <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailToForgotPassword;
