import axios from "axios";
import { BASE_URL } from "../../utils/utils";

//add course
export const addCourseAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/courses`, data, {
    withCredentials: true,
  });
  return response?.data;
};

//get all course sections
export const getAllCoursesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/courses`, {
    withCredentials: true,
  });
  return response?.data;
};

//Apply for course
export const startCourseAPI = async (data) => {
  console.log("data", data);
  const response = await axios.post(`${BASE_URL}/progress/apply`, data, {
    withCredentials: true,
  });
  return response?.data;
};

//get single course
export const getSingleCourseAPI = async (id) => {
  const response = await axios.get(`${BASE_URL}/courses/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};

//update course
export const updateCourseAPI = async (data) => {
  const response = await axios.put(
    `${BASE_URL}/courses/${data?.courseId}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//delete course
export const deleteCourseAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/courses/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};
