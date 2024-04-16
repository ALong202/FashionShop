/* https://redux-toolkit.js.org/api/createSlice
slice là collection của reducers, action, logic cho một tính năng (ví dụ: user, cart) của ứng dụng.
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setIsAuthenticated, setUser } = userSlice.actions;