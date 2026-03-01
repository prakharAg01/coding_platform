import { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Assuming you use react-router

const ForgotPassword = () => {
  const { isAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/password/forgot",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-glow p-6">
      <div className="auth-card w-full max-w-md p-8 sm:p-10 shadow-2xl text-center">
        <h2 className="text-3xl font-bold mb-3 text-gradient-yellow">
          Forgot Password
        </h2>
        <p className="text-sm mb-8 text-gray-400">
          Enter your email address to receive a password reset token.
        </p>

        <form onSubmit={handleForgotPassword} className="text-left space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-bg-dark/50 border border-card-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-yellow/50 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-brand-yellow text-bg-dark font-bold hover:opacity-90 transition-all shadow-lg active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-8">
          <Link 
            to="/auth" 
            className="text-sm text-gray-500 hover:text-brand-yellow transition-colors"
          >
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;