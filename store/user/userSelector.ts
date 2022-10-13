import { AppState } from "../store";
import { userSlice } from "./userSlice";

export const { setUser } = userSlice.actions;
export const selectUser = (state: AppState) => state.user.user;
