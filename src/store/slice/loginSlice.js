import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { ipcRenderer } = window.require("electron");

export const registerCheck = createAsyncThunk(
  "login/registerCheck",
  async (body, thunkAPI) => {
    const response = await ipcRenderer.invoke("registerCheck", body);
    return response;
  }
);
export const loginProgram = createAsyncThunk(
  "login/loginProgram",
  async (body, thunkAPI) => {
    const response = await ipcRenderer.invoke("loginProgram", body);
    return response;
  }
);

const initialState = {
  loading: false,
  loginEnter: "",
  name: "",
  passport: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logining: (state, { payload }) => {
      state.loginEnter = payload;
    },
  },
  extraReducers: (builder) => {
    //------------------------------------getAllList---------------------
    builder
      .addCase(registerCheck.pending, (state, { payload }) => {
        console.log("pending");
      })
      .addCase(registerCheck.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
      })
      .addCase(registerCheck.rejected, (state, { payload }) => {
        console.log("rejected");
      });
    builder
      .addCase(loginProgram.pending, (state, { payload }) => {
        console.log("pending");
      })
      .addCase(loginProgram.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
      })
      .addCase(loginProgram.rejected, (state, { payload }) => {
        console.log("rejected");
      });
    //     //------------------------------------InsertItem---------------------
  },
});
export const { logining } = loginSlice.actions;
export default loginSlice.reducer;
