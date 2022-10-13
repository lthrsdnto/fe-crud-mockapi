import { AppState } from "../store";
import { authSlice } from "./authSlice";

export const { setAuthState, setIncrement, setDecrement } = authSlice.actions;
export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectCounter = (state: AppState) => state.auth.counter;
