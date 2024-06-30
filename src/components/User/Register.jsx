import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";
import { registerAPI } from "../../reactQuery/user/usersAPI";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Username is required"),
});

const Register = () => {
  const navigate = useNavigate();
  //react querys
  //mutation
  const mutation = useMutation({ mutationFn: registerAPI });
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "atom@gmail.com",
      password: "123456",
      username: "atom",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation
        .mutateAsync(values)
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

  //Redirect if a user is login
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-md p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Create Account
          </h1>

          {mutation.isPending && (
            <AlertMessage type="loading" message="Loading..." />
          )}
          {mutation.isError && (
            <AlertMessage
              type="error"
              message={
                mutation.error.response?.data?.message || mutation.error.message
              }
            />
          )}
          {mutation.isSuccess && (
            <AlertMessage
              type="success"
              message="Account created successfully"
            />
          )}

          <Link
            to="/login"
            className="text-sm text-indigo-600 hover:text-indigo-700 transition duration-200 block text-center mb-6"
          >
            Already have an account? <span className="font-medium">Login</span>
          </Link>

          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <AiOutlineUser className="text-gray-500" />
            <input
              className="w-full bg-transparent focus:ring-0 placeholder-gray-400 ml-2"
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </div>
          )}

          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <AiOutlineMail className="text-gray-500" />
            <input
              className="w-full bg-transparent focus:ring-0 placeholder-gray-400 ml-2"
              type="email"
              placeholder="Email address"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}

          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <RiLockPasswordLine className="text-gray-500" />
            <input
              className="w-full bg-transparent focus:ring-0 placeholder-gray-400 ml-2"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}

          <button
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
