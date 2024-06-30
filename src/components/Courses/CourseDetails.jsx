import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaBookOpen,
  FaUser,
  FaUsers,
  FaLayerGroup,
  FaStar,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaPlay,
  FaPlus,
  FaTrophy,
  FaChartLine,
  FaBookReader,
  FaPlusCircle,
} from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import {
  getSingleCourseAPI,
  startCourseAPI,
} from "../../reactQuery/courses/coursesAPI";
import AlertMessage from "../Alert/AlertMessage";
import { useSelector } from "react-redux";

const CourseDetail = ({ course }) => {
  const { courseId } = useParams();

  //query to fetch single course
  const {
    data: courseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["course"],
    queryFn: () => getSingleCourseAPI(courseId),
  });

  //start course mutation

  const startCourseMutation = useMutation({
    mutationKey: ["start-course"],
    mutationFn: startCourseAPI,
  });
  //start course mutation handler
  const handleStartCourse = () => {
    startCourseMutation.mutate({ courseId });
  };

  //Get the auth user

  const userProfile = useSelector((state) => state.auth.userProfile);

  // const isInstructor = courseData?.instructor.id === userProfile.id;
  const isStudent = userProfile.role === "student";

  return (
    <>
      <div className="container mx-auto p-8 bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-6xl font-black text-gray-900 mb-8">
          {courseData?.title}
        </h1>
        <p className="text-gray-800 text-lg mb-8">{courseData?.description}</p>

        <div className="mb-10">
          <h2 className="text-4xl font-semibold text-gray-900 mb-5">
            Instructor & Course Info
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* instructor and course details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Instructor
              </h3>
              <div className="flex items-center text-gray-800">
                <FaUser className="text-blue-500 mr-3 text-xl" />
                <span className="text-lg">{courseData?.user?.username}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Stats
              </h3>
              <div className="space-y-3">
                {/* total students */}
                <p className="flex items-center">
                  <FaUsers className="text-blue-500 mr-2" />
                  <span>{courseData?.students?.length} Students</span>
                </p>
                {/* total sections */}
                <p className="flex items-center">
                  <FaLayerGroup className="text-blue-500 mr-2" />
                  <span>{courseData?.sections?.length} Sections</span>
                </p>
                {/* difficulty level */}
                <p className="flex items-center">
                  <span className="font-medium text-blue-500">
                    {courseData?.difficulty}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert messages */}
        {startCourseMutation.isPending && (
          <AlertMessage type="loading" message="Enrolling you..." />
        )}
        {startCourseMutation.isError && (
          <AlertMessage
            type="error"
            message={startCourseMutation.error?.response?.data?.message}
          />
        )}
        {startCourseMutation.isSuccess && (
          <AlertMessage type="success" message="Enrolled successfully!" />
        )}

        {/* Action buttons */}
        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleStartCourse}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            <FaPlay className="mr-2" /> Start Tracking Your Progress
          </button>

          <Link
            to={`/start-section/${courseId}`}
            className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            <FaBookOpen className="mr-2" /> Start Course Section
          </Link>

          <Link
            to={`/progress-update/${courseId}`}
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            <FaChartLine className="mr-2" /> Update Progress
          </Link>

          <Link
            to={`/students-position/${courseId}`}
            className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            <FaTrophy className="mr-2" /> Students Ranking
          </Link>
        </div>
      </div>
      {/* check if it has sections */}
      {courseData?.sections?.length > 0 ? (
        <div className="mt-6 mb-6">
          <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-4">
            Course Sections ({courseData?.sections?.length})
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {courseData?.sections?.map((section) => (
              <div
                key={section._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold text-gray-800">
                    {section.sectionName}
                  </p>
                  <div className="flex space-x-2">
                    <Link to={`/update-course-section/${section._id}`}>
                      <button className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
                        <FiEdit2 size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(section._id)}
                      className="flex items-center justify-center p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            No Sections Found
          </h2>
        </div>
      )}
    </>
  );
};

export default CourseDetail;
