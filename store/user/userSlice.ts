import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const STORE_NAME = "user";
const hydrate = createAction(HYDRATE);

//type for our state
export interface User {
  id: number;
  name: string;
  username: string;
}

//type for our state
export interface UserState {
  user: User[];
}

//initial state
const initialState: UserState = {
  user: [],
};

//actual slice
export const userSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    //action to set the authentication status
    setUser(state, action: PayloadAction<User[]>) {
      state.user = action.payload;
    },
  },
  //special reducer for hydrating the state. special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[STORE_NAME] as unknown as Partial<UserState>),
    }));
  },
});

export const { setUser } = userSlice.actions;
