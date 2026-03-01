import React from "react";

const techData = [
  {
    name: "React",
    image: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    description:
      "React is a powerful JavaScript library for building dynamic and responsive user interfaces.",
  },
  {
    name: "Node.js",
    image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
    description:
      "Node.js is a JavaScript runtime that lets you build scalable server-side applications.",
  },
  {
    name: "Express.js",
    image: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
    description:
      "Express.js is a lightweight web application framework for Node.js, used to build robust APIs.",
  },
  {
    name: "MongoDB",
    image: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
    description:
      "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
  },
];

const Technologies = () => {
  return (
    <>
      <div className="py-12 px-5 text-center min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-4xl text-brand-green mb-8 drop-shadow-md">
          Technologies We'll Use
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          {techData.map((tech, index) => {
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-[300px] w-[90%] p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5">
                  <img 
                    src={tech.image} 
                    alt={tech.name} 
                    className="w-20 h-20 mx-auto object-contain"
                  />
                </div>
                <h3 className="text-2xl text-brand-green mb-2">{tech.name}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Technologies;
