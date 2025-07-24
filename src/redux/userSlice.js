const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", status: false, photoUrl: "" },
  reducers: {
    changeUserState: (state, action) => {
      const { name, status, photoUrl } = action.payload;
      console.log("slice: ", action.payload);
      return { name, status, photoUrl };
    },
  },
});
export const { changeUserState } = userSlice.actions;
export default userSlice.reducer;
