import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const STORE_NAME = "auth";
const hydrate = createAction(HYDRATE);

//type for our state
export interface AuthState {
  authState: boolean;
  counter: number;
}

//initial state
const initialState: AuthState = {
  authState: false,
  counter: 0,
};

//actual slice
export const authSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    //action to set the authentication status
    setAuthState(state, action: PayloadAction<boolean>) {
      state.authState = action.payload;
    },

    setIncrement(state, action: PayloadAction<number>) {
      state.counter = action.payload + 1;
    },

    setDecrement(state, action: PayloadAction<number>) {
      state.counter = action.payload - 1;
    },
  },
  //special reducer for hydrating the state. special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[STORE_NAME] as unknown as Partial<AuthState>),
    }));
  },
});

export const { setAuthState, setIncrement, setDecrement } = authSlice.actions;
