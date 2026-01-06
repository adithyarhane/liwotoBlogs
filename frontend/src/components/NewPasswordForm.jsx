import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const NewPasswordForm = ({ email, resetOtp }) => {
  const { resetPassword } = useAuthContext();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e, email, otp, newPassword) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    resetPassword(e, email, otp, newPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-4 rounded-full bg-emerald-500 text-white shadow mb-4">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500 mt-2">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => handleSubmit(e, email, resetOtp, formData.password)}
          className="space-y-5"
        >
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-emerald-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-emerald-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

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
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Choose a strong password you haven’t used before.
        </p>
      </div>
    </div>
  );
};

export default NewPasswordForm;
