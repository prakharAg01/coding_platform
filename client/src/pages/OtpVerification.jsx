import { useContext, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { email} = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const data = {
      email,
      otp: enteredOtp,
    };
    await axios
      .post("http://localhost:4000/api/v1/user/otp-verification", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsAuthenticated(false);
        setUser(null);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen font-sans">
        <div className="text-center p-8 px-5 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-4xl mb-5">OTP Verification</h1>
          <p className="text-gray-500 leading-snug text-base mb-5">Enter the 5-digit OTP sent to your registered email or phone.</p>
          <form onSubmit={handleOtpVerification}>
            <div className="flex justify-between gap-2 mb-5">
              {otp.map((digit, index) => {
                return (
                  <input
                  id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg outline-none transition-all bg-gray-50 focus:border-brand-green focus:bg-white"
                  />
                );
              })}
            </div>
            <button 
              type="submit"
              className="bg-brand-green text-white text-base py-3 px-5 border-none rounded-lg cursor-pointer transition-colors w-full hover:bg-brand-green-dark"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
