import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async (data) => {
    await axios
      .post("http://localhost:4000/api/v1/user/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        setUser(res.data.user);
        navigateTo("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <form
        className="text-left"
        onSubmit={handleSubmit((data) => handleLogin(data))}
      >
        <h2 className="text-center text-2xl font-bold mb-5">Login</h2>
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
        <p className="text-right my-5 text-base text-brand-green">
          <Link to={"/password/forgot"} className="hover:underline">Forgot your password?</Link>
        </p>
        <button 
          type="submit"
          className="w-full p-3 bg-brand-green text-white border-none rounded text-base cursor-pointer transition-colors hover:bg-brand-green-dark"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
