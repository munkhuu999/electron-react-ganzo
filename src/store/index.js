import { configureStore, ThunkAction, combineReducers } from "@reduxjs/toolkit";

// import loginReducer from "./Slices/loginSlice";
// import comfirmReducer from "./Slices/ConfirmModalSlice";
// import productSlice from "./Slices/productSlice";
// import authorFormReducer from "./Slices/authorFormSlice";
// import sellerProReducer from "./Slices/sellerProductionSlice";
// import wishListReducer from "./Slices/wishListSlice";
// import shopCartReducer from "./Slices/cartListSlice";
import insertTestReducer from "./slice/insertTestSlices";
import loginReducer from "./slice/loginSlice";

// const CombineReducers = combineReducers({
//   loginReducer,
//   comfirmReducer,
//   creationReducer,
// });

export default configureStore({
  reducer: {
    insertTestReducer,
    loginReducer,

    // reducer: CombineReducers,
    devTools: true,
  },
});
