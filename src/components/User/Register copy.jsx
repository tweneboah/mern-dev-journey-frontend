import React from "react";

const Register = () => {
  return (
    <div className="flex flex-wrap pb-24">
      <div className="w-full  p-4">
        <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
          <form onSubmit={formik.handleSubmit}>
            <Link
              to="/login"
              className="inline-block text-gray-500 hover: transition duration-200 mb-8"
            >
              <span>Already have an account?</span>
              <span />
              <span className="font-bold font-heading">Login</span>
            </Link>
            {/* show message */}
            {mutation.isPending && (
              <AlertMessage type="loading" message="Loading..." />
            )}
            {/* show error */}
            {mutation.isError && (
              <AlertMessage
                type="error"
                message={
                  mutation?.error?.response?.data?.message ||
                  mutation?.error?.message
                }
              />
            )}
            {/* show success */}
            {mutation.isSuccess && (
              <AlertMessage
                type="success"
                message="Account created successfully"
              />
            )}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput1"
            >
              Username
            </label>
            <input
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              type="text"
              placeholder="Enter username"
              {...formik.getFieldProps("username")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {/* error */}
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 mt-1">{formik.errors.username}</div>
            )}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput1"
            >
              Email
            </label>
            <input
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              type="text"
              placeholder="john@email.com"
              {...formik.getFieldProps("email")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {/* error */}
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="textInput2"
            >
              Password
            </label>
            <div className="flex items-center gap-1 w-full rounded-full p-4 border border-gray-100 shadow mb-8">
              <input
                className="outline-none flex-1 placeholder-gray-500 "
                id="textInput2"
                type="password"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="current-password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                  fill="#A3A3A3"
                />
                <path
                  d="M12.0004 9.14C10.4304 9.14 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14 12.0004 9.14Z"
                  fill="#A3A3A3"
                />
              </svg>
            </div>
            {/* error */}
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            )}
            <button
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-orange-500 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
