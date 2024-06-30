import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { AiFillCamera, AiFillDelete } from "react-icons/ai";

import { useMutation } from "@tanstack/react-query";

import { uploadProfilePhotoAPI } from "../../reactQuery/user/usersAPI";

const UpdateProfilePicture = () => {
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const mutation = useMutation({ mutationFn: uploadProfilePhotoAPI });

  const formik = useFormik({
    initialValues: {
      profilePicture: null,
    },

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("profilePicture", values.profilePicture);
      mutation.mutate(formData);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    if (file.size > 1048576) {
      setImageError("File size exceeds 1MB");
      return;
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageError("Invalid File Type");
      return;
    }

    formik.setFieldValue("profilePicture", file);
    setImagePreview(URL.createObjectURL(file));
    setImageError("");
  };

  const removeImage = () => {
    formik.setFieldValue("profilePicture", null);
    setImagePreview(null);
  };
  console.log(mutation);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          <AiFillCamera className="inline-block mr-2" /> Update Profile Picture
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload Input - File input for uploading images */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="images"
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {imageError && <p className="text-sm text-red-600">{imageError}</p>}
            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-full"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-0 bottom-0 bg-red-600 text-white rounded-full p-1"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button - Button to submit the form */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload Profile Picture
          </button>
        </form>
      </div>
    </div>

    // ... rest of your code
  );
};

export default UpdateProfilePicture;
