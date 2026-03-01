import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    await axios
      .post("http://localhost:4000/api/v1/user/register", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigateTo(`/otp-verification/${data.email}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div>
        <form
          className="text-left"
          onSubmit={handleSubmit((data) => handleRegister(data))}
        >
          <h2 className="text-center text-2xl font-bold mb-5">Register</h2>
          <input
            type="text"
            placeholder="Name"
            required
            {...register("name")}
            className="w-full p-2.5 mb-4 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
          />
          <input
            type="email"
            placeholder="Email"
            required
            {...register("email")}
            className="w-full p-2.5 mb-4 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
          />
          <input
            type="password"
            placeholder="Password"
            required
            {...register("password")}
            className="w-full p-2.5 mb-4 border border-gray-300 rounded focus:outline-none focus:border-brand-green"
          />
          <button 
            type="submit"
            className="w-full p-3 bg-brand-green text-white border-none rounded text-base cursor-pointer transition-colors hover:bg-brand-green-dark"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
