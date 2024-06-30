import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FaCheck, FaHourglassStart, FaRegCircle } from "react-icons/fa";
import { getPrivateUserProfileAPI } from "../../reactQuery/user/usersAPI";

import { useDispatch } from "react-redux";

function Dashboard() {
  //react query
  const { data: coursesData, error } = useQuery({
    queryKey: ["course-sections"],
    queryFn: () => getPrivateUserProfileAPI(),
  });
  //dispatch
  const dispatch = useDispatch();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Course Progress Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData?.coursesProgress?.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="bg-white transform hover:scale-105 transition duration-500 rounded-2xl overflow-hidden shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {course.courseTitle}
        </h2>
        <ProgressBar
          completed={course.completed}
          total={course.totalSections}
        />
        <div className="mt-4">
          <div className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span className="text-gray-700">Completed: {course.completed}</span>
          </div>
          <div className="flex items-center mt-2">
            <FaHourglassStart className="text-yellow-500 mr-2" />
            <span className="text-gray-700">Ongoing: {course.ongoing}</span>
          </div>
          <div className="flex items-center mt-2">
            <FaRegCircle className="text-gray-500 mr-2" />
            <span className="text-gray-700">
              Not Started: {course.notStarted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ completed, total }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-500 h-3 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default Dashboard;
