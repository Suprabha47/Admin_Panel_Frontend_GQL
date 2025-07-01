const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", status: false },
  reducers: {
    changeUserState: (state, action) => {
      const { name, status } = action.payload;
      console.log("slice: ", action.payload);
      return { name, status };
    },
  },
});
export const { changeUserState } = userSlice.actions;
export default userSlice.reducer;
