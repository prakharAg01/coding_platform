import { useContext } from "react";
import Hero from "../components/Hero";
import Technologies from "../components/Technologies";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <MainLayout onBack={handleBack} onLogout={handleLogout}>
      <section className="flex-1 overflow-y-auto w-full relative">
        <div className="w-full px-6 py-6 min-h-full">
          <Hero />
          <Technologies />
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
