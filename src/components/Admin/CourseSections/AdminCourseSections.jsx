import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  deleteSectionAPI,
  getAllCourseSectionsAPI,
} from "../../../reactQuery/courseSections/courseSectionsAPI";
import { Link } from "react-router-dom";
import AlertMessage from "../../Alert/AlertMessage";

const AdminCourseSections = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["course-sections"],
    queryFn: () => getAllCourseSectionsAPI(),
  });

  //delete mutation
  const mutation = useMutation({ mutationFn: deleteSectionAPI });

  //handle delete
  const handleDelete = (sectionId) => {
    mutation
      .mutateAsync(sectionId)
      .then((data) => {
        refetch();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  console.log("data", data);
  //Show loading
  if (isLoading) return <AlertMessage type="loading" message="Loading..." />;
  //Show error
  if (isError)
    return (
      <AlertMessage
        type="error"
        message={error?.response?.data?.message || "Error loading sections!"}
      />
    );

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-100 p-8">
      <h2 className="text-2xl font-bold">Course Sections</h2>
      {/* show error */}
      {mutation.isError && (
        <AlertMessage
          type="error"
          message={mutation.error?.response?.data?.message}
        />
      )}
      {/* show loading */}
      {mutation.isLoading && (
        <AlertMessage type="loading" message="Deleting..." />
      )}
      {data?.map((section) => (
        <div
          key={section._id}
          className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg"
        >
          <p className="text-xl font-semibold text-gray-800">
            {section.sectionName}
          </p>
          <div className="space-x-2">
            <Link to={`/update-course-section/${section._id}`}>
              <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200">
                <FiEdit2 />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(section._id)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-200"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCourseSections;
