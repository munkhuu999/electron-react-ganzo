import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { ipcRenderer } = window.require("electron");

export const getTestData = createAsyncThunk(
  "insertTest/getTestData",
  async (body, thunkAPI) => {
    const response = await ipcRenderer.invoke("getTestData", body);
    return response;
  }
);

const initialState = {
  loading: false,
  textt: "",
  testData: [],
};

export const insertTestSlice = createSlice({
  name: "insertTest",
  initialState,
  reducers: {
    // addItemInWishList: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    //------------------------------------getAllList---------------------
    builder
      .addCase(getTestData.pending, (state, { payload }) => {
        console.log("pending");
      })
      .addCase(getTestData.fulfilled, (state, { payload }) => {
        state.testData = payload;
      })
      .addCase(getTestData.rejected, (state, { payload }) => {
        console.log("rejected");
      });
    //     //------------------------------------InsertItem---------------------
  },
});
export const {} = insertTestSlice.actions;
export default insertTestSlice.reducer;
