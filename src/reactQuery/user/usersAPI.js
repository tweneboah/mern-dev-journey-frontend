import axios from "axios";
import { BASE_URL } from "../../utils/utils";

//=======Get user profile=====
export const getUserProfileAPI = async (courseId) => {
  const response = await axios.get(
    `${BASE_URL}/users/profile?courseId=${courseId}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//--priavte profile
export const getPrivateUserProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users/profile/private`, {
    withCredentials: true,
  });
  return response?.data;
};
//=======Registration=====

export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Login=====

export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//get all users
export const getAllUsersAPI = async (courseId) => {
  const response = await axios.get(`${BASE_URL}/users/position/${courseId}`, {
    withCredentials: true,
  });
  return response?.data;
};
//=======Check auth=====

export const checkUserAuthStatusAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
    withCredentials: true,
  });
  return response?.data;
};
//=======Logout =====

export const logoutAPI = async () => {
  const response = await axios.post(
    "http://localhost:9000/api/v1/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//===subscription====
export const subscribeToFreePlanAPI = async (subscriptionPlanId) => {
  const response = await axios.put(
    `${BASE_URL}/users/subscribeToFreePlan/${subscriptionPlanId}`,
    {
      subscriptionPlanId,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

// "/account-verification-email",

export const sendAccountVerificationEmailAPI = async () => {
  const response = await axios.put(
    `${BASE_URL}/users/account-verification-email`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//verifyEmailAccount
export const verifyEmailAccountAPI = async (verifyToken) => {
  const response = await axios.get(
    `${BASE_URL}/users/account-verification/${verifyToken}`,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//Update email
export const updateEmailAPI = async (email) => {
  const response = await axios.put(
    `${BASE_URL}/users/update-email`,
    {
      email,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//forgot-password
export const forgotPasswordAPI = async (email) => {
  console.log("email", email);
  const response = await axios.post(
    `${BASE_URL}/users/forgot-password`,
    {
      email,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//reset-password/:resetToken

export const resetPasswordAPI = async (data) => {
  console.log("data", data);
  const response = await axios.post(
    `${BASE_URL}/users/reset-password/${data?.resetToken}`,
    {
      password: data?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//upload-profile-photo
export const uploadProfilePhotoAPI = async (formData) => {
  const response = await axios.put(
    `${BASE_URL}/users/upload-profile-photo`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//toggle-follow and unfollow
export const toggleFollowAPI = async (userId) => {
  console.log("userId", userId);
  const response = await axios.put(
    `${BASE_URL}/users/toggle-user-follow/${userId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
