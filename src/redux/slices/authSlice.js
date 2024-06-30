import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

// Async thunk for checking user authentication status
export const checkUserAuthStatus = createAsyncThunk(
  "auth/checkUserAuthStatus",
  async () => {
    const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
      withCredentials: true,
    });
    return response?.data;
  }
);
// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers for other sync actions
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.userProfile = action.payload.user;
        state.loading = false;
      })
      .addCase(checkUserAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userProfile = null;
        state.loading = false;
        localStorage.removeItem("isAuthenticated");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserProfile } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
