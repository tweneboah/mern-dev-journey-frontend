import React from "react";
import { FaTrophy, FaClock, FaUserGraduate } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { BiBookReader } from "react-icons/bi";

const CourseChallengeAnnouncement = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-gray-800">
      <div className="flex flex-col items-center text-center">
        <FaTrophy className="text-8xl text-yellow-500 mb-4" />
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          Win $100 and Exciting Rewards!
        </h2>
        <p>
          Be the first to complete our{" "}
          <span className="font-semibold">
            Fullstack Web Development Course (MERN)
          </span>{" "}
          and win amazing prizes!
        </p>
      </div>

      <div className="flex justify-around items-center mt-6 mb-4">
        <div className="flex flex-col items-center">
          <GiMoneyStack className="text-4xl text-green-500" />
          <span className="mt-2">$100 Cash Prize</span>
        </div>
        <div className="flex flex-col items-center">
          <BiBookReader className="text-4xl text-indigo-500" />
          <span className="mt-2">1 Free Course</span>
        </div>
        <div className="flex flex-col items-center">
          <FaUserGraduate className="text-4xl text-red-500" />
          <span className="mt-2">3 Days Live Support</span>
        </div>
      </div>

      <div className="bg-blue-100 p-4 rounded-md my-4">
        <h3 className="font-semibold mb-2 flex items-center justify-center">
          <FaClock className="text-blue-500 mr-2 text-3xl" />
          Challenge Duration: <strong>3 Months</strong>
        </h3>
        <p>Accelerate your learning and be the first to conquer the course!</p>
      </div>

      <div className="mt-4 text-center">
        <p className="italic">
          Note: The winner will be interviewed to assess understanding.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-700 transition duration-300">
          Start Now
        </button>
      </div>
    </div>
  );
};

export default CourseChallengeAnnouncement;
