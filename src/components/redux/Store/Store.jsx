import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../API/Auth/AuthThunk";

const Store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default Store;
