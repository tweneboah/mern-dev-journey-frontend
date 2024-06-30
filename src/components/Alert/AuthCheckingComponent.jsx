import React from "react";
import { FaSpinner } from "react-icons/fa";

const AuthCheckingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 ">
      <div className="animate-bounce">
        <FaSpinner className="animate-spin text-6xl text-blue-800" />
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-800 animate-pulse">
        Checking authentication status, please wait...
      </p>
    </div>
  );
};

export default AuthCheckingComponent;
