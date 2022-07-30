import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/UserModel";
import { RootState } from "./store";

interface UserState {
  userJson: string;
}

const userInitialState: UserState = {
  userJson: JSON.stringify(new User("", "", 0)),
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserJson: (state, action: PayloadAction<string>) => {
      return { ...state, userJson: action.payload };
    },
  },
});

// export const { setUser } = userSlice.actions;
export const { setUserJson } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.userJson;

export default userSlice.reducer;
