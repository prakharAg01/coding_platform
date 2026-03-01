import React, { useContext } from "react";
import heroImage from "../assets/img1.png";
import { Context } from "../main";

const Hero = () => {
  const { user } = useContext(Context);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-col gap-5 w-full text-center p-5">
        <img 
          src={heroImage} 
          alt="hero-image" 
          className="w-24 h-24 sm:w-40 sm:h-40"
        />
        <h4 className="text-2xl sm:text-3xl font-medium">Hello, {user ? user.name : "Developer"}</h4>
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome to JKLU CODING HOUR PLATFORM </h1>      
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl text-center leading-loose">
          Welcome to JKLU Coding Hour Platform — a space where innovation meets logic. Designed to help students strengthen their programming skills, solve real-world problems, and build confidence through practice, our platform empowers future developers to learn, compete, and grow together. Start coding, start building, and shape your future today.
        </p>
      </div>
    </>
  );
};

export default Hero;
