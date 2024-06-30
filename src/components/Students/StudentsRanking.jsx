import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";
import { FaMedal } from "react-icons/fa";
import { getAllUsersAPI } from "../../reactQuery/user/usersAPI";
import AlertMessage from "../Alert/AlertMessage";

const StudentRankList = () => {
  //get the course Id
  const { courseId } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["course-sections"],
    queryFn: () => getAllUsersAPI(courseId),
  });
  console.log(data);
  //display loading
  if (isLoading)
    return <AlertMessage type="loading" message="Loading students..." />;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Student Progress Rankings
      </h1>
      <div className="flex flex-col">
        {data?.map((student, index) => (
          <div
            key={student?.id}
            className={`flex items-center justify-between p-4 my-2 rounded-lg shadow transition duration-300 ${
              index === 0
                ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                : index === 1
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                : index === 2
                ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <span
                className={`mr-2 font-bold text-lg ${
                  index < 3 ? "text-white" : "text-gray-700"
                }`}
              >
                {student?.position}.
              </span>
              <FaMedal
                className={`mr-3 ${
                  index < 3 ? "text-yellow-300" : "text-gray-400"
                }`}
                size={24}
              />
              <span
                className={`font-medium mr-4 ${
                  index < 3 ? "text-white" : "text-gray-800"
                }`}
              >
                {student.username}
              </span>
              <div
                className={`text-sm ${
                  index < 3 ? "text-gray-200" : "text-gray-600"
                }`}
              >
                Joined on {new Date(student?.dateJoined).toDateString()}
              </div>
            </div>

            <div
              className={`text-right ${
                index < 3 ? "text-white" : "text-gray-800"
              }`}
            >
              <span className="font-bold">{student.progressPercentage}%</span>
              <span className="ml-4 text-sm">
                ({student?.sectionsCompleted}/{student?.totalSections} sections)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRankList;
