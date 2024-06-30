import { useMutation, useQuery } from "@tanstack/react-query";
import { FaBookReader, FaPlayCircle, FaPencilAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { getUserProfileAPI } from "../../reactQuery/user/usersAPI";
import { startSectionAPI } from "../../reactQuery/courseSections/courseSectionsAPI";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";

const StartSection = () => {
  //get the course id
  const { courseId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["course-sections"],
    queryFn: () => getUserProfileAPI(courseId),
  });

  const updateProgressMutation = useMutation({
    mutationKey: ["update-course-sections"],
    mutationFn: startSectionAPI,
  });
  console.log("data", data?.courseProgress);

  //get the sections

  const courseSections = data?.courseProgress?.courseId?.sections;
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (data && data.profile) {
      setSections(data.profile.progress[0].sections);
    }
  }, [data]);

  //courseId
  const handleProgressChange = (sectionId) => {
    const updateData = {
      sectionId: sectionId,
      courseId: courseId,
    };

    updateProgressMutation.mutate(updateData);
  };
  console.log("error", error);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sections!</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Start Course Section
      </h2>

      {/* Alert messages */}
      {updateProgressMutation.isPending && (
        <AlertMessage type="loading" message="Enrolling you..." />
      )}
      {updateProgressMutation.isError && (
        <AlertMessage
          type="error"
          message={updateProgressMutation.error?.response?.data?.message}
        />
      )}
      {updateProgressMutation.isSuccess && (
        <AlertMessage type="success" message="Section started successfully!" />
      )}

      {courseSections?.map((section) => {
        return (
          <div
            key={section?._id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg mb-4 shadow"
          >
            <span className="flex items-center font-medium text-gray-800 mb-3 sm:mb-0">
              <FaBookReader className="text-indigo-500 mr-3 text-xl" />
              {section?.sectionName}
            </span>

            <div className="flex items-center space-x-3">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                onClick={() => handleProgressChange(section._id)}
              >
                <FaPlayCircle className="mr-2" /> Start
              </button>

              <Link
                to={`/progress-update/${courseId}`}
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                <FaPencilAlt className="mr-2" /> Update Progress
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StartSection;
