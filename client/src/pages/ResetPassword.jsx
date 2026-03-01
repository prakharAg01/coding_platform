import { useContext, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const ResetPassword = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <div className="bg-white/90 p-10 rounded-xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-3xl mb-2">Reset Password</h2>
          <p className="text-base mb-5 text-gray-600">Enter your new password below.</p>
          <form onSubmit={handleResetPassword} className="text-left">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2.5 mb-5 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2.5 mb-5 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
            />
            <button 
              type="submit"
              className="w-full p-3 text-base border-none rounded bg-brand-green text-white cursor-pointer transition-colors hover:bg-brand-green-dark"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
