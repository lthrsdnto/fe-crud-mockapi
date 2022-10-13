import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "./userSlice";

export const getUserDetails = createAsyncThunk<string>(
  "user/getusers",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const data = await axios.get(
        "https://63438d663f83935a78552378.mockapi.io/user"
      );
      console.log("data", data.data);
      dispatch(setUser(data.data));
      return data.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
