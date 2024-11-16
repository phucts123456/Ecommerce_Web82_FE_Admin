import React from "react";
import { FaStar } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center font-bold text-gray-800">
      <FaStar className="text-yellow-500 text-3xl mr-2" />
      <span className="text-xl tracking-wide">Exclusive</span>
    </div>
  );
};

export default Logo;
