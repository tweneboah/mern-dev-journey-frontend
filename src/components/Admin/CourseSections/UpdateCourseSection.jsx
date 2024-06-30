import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../Alert/AlertMessage";
import { registerAPI } from "../../../reactQuery/user/usersAPI";
import {
  addCourseSectionAPI,
  getSingleSectionAPI,
  updateSectionAPI,
} from "../../../reactQuery/courseSections/courseSectionsAPI";

// Validation schema using Yup
const validationSchema = Yup.object({
  sectionName: Yup.string().required("Section name is required"),
});

const UpdateCourseSection = () => {
  const navigate = useNavigate();
  //get the course id from params
  const { sectionId } = useParams();
  //usequery to get the section details
  const { data: sectionDetails, error } = useQuery({
    queryKey: ["course-section"],
    queryFn: () => getSingleSectionAPI(sectionId),
  });

  console.log("sectionDetails", sectionDetails);
  //mutation
  const mutation = useMutation({ mutationFn: updateSectionAPI });
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      sectionName: sectionDetails?.sectionName || "",
    },
    validationSchema: validationSchema,
    //ENABLE REINITIALIZE
    enableReinitialize: true,
    onSubmit: (values) => {
      //data
      const data = {
        sectionId,
        sectionName: values.sectionName,
      };
      mutation
        .mutateAsync(data)
        .then((data) => {
          console.log("data", data);
          // navigate("/login");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });
  //get the auth from store
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-wrap pb-24 bg-gray-50">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center py-24 max-w-lg mx-auto bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Update Course Section
          </h1>
          <form onSubmit={formik.handleSubmit} className="px-8">
            {/* Alert Messages */}
            {mutation.isPending && (
              <AlertMessage type="loading" message="Loading..." />
            )}
            {mutation.isError && (
              <AlertMessage
                type="error"
                message={
                  mutation?.error?.response?.data?.message ||
                  mutation?.error?.message
                }
              />
            )}
            {mutation.isSuccess && (
              <AlertMessage
                type="success"
                message="Course section updated successfully"
              />
            )}

            {/* Section Name Input */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Section Name
              </label>
              <input
                className="w-full rounded-lg p-4 border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
                type="text"
                placeholder="Enter section name"
                {...formik.getFieldProps("sectionName")}
              />
              {formik.touched.sectionName && formik.errors.sectionName && (
                <div className="text-red-500 mt-1">
                  {formik.errors.sectionName}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="h-12 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg w-full transition duration-200 ease-in-out flex items-center justify-center"
              type="submit"
            >
              <i className="ri-add-circle-line mr-2"></i> Update Course Section
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourseSection;
