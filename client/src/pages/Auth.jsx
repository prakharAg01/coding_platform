import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const AuthTab = ({ active, label, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 ${
        active 
          ? 'bg-brand-yellow text-bg-dark shadow-lg' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-glow p-4">
      <div className="auth-card w-full max-w-md p-8 sm:p-10 shadow-2xl">
        
        {/* Toggle Header */}
        <div className="flex mb-8 overflow-hidden rounded-xl border border-card-border bg-black/20">
          <AuthTab label="Login" active={isLogin} onClick={() => setIsLogin(true)} />
          <AuthTab label="Register" active={!isLogin} onClick={() => setIsLogin(false)} />
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {isLogin ? <Login /> : <Register />}
        </div>
        
      </div>
    </div>
  );
};

export default Auth;
