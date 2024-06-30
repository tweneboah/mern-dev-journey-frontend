import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";

const ProfileImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to upload image
    console.log(`Uploading image: ${image.name}`);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-orange-100 h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center"
      >
        <label className="flex items-center justify-center py-2 px-4 bg-orange-500 text-white rounded-lg shadow-md cursor-pointer">
          <AiFillPicture className="mr-2" />
          Select Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Image
        </button>
      </form>
      {preview && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Preview:</h2>
          <img
            src={preview}
            alt="Preview"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
