import axios from "axios";
import { BASE_URL } from "../../utils/utils";

//add course
export const addCourseSectionAPI = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/course-sections/${data?.courseId}`,
    {
      sectionName: data?.sectionName,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//get all course sections
export const getAllCourseSectionsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/course-sections`, {
    withCredentials: true,
  });
  return response?.data;
};

//update progress
export const updateProgressAPI = async (data) => {
  console.log("data", data);
  const response = await axios.put(`${BASE_URL}/progress/update`, data, {
    withCredentials: true,
  });
  return response?.data;
};

//start section
export const startSectionAPI = async (data) => {
  console.log("data", data);
  const response = await axios.put(`${BASE_URL}/progress/start-section`, data, {
    withCredentials: true,
  });
  return response?.data;
};

//update section
export const updateSectionAPI = async (data) => {
  const response = await axios.put(
    `${BASE_URL}/course-sections/${data?.sectionId}`,
    {
      sectionName: data?.sectionName,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//delete section
export const deleteSectionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/course-sections/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};

//get single section
export const getSingleSectionAPI = async (id) => {
  const response = await axios.get(`${BASE_URL}/course-sections/${id}`, {
    withCredentials: true,
  });
  return response?.data;
};
