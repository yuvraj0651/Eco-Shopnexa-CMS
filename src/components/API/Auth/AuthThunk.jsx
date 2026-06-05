import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  authData: storedAuth?.user || null,
  currentUser: storedAuth?.currentUser || null,
  isAuthenticated: storedAuth?.isAuthenticated || false,
  token: storedAuth?.token || null,
  loading: {
    login: false,
    register: false,
    current: false,
  },
  error: null,
};

const BASE_URL = "http://localhost:5000/auth";

const getTokenData = () => {
  return Math.random().toString(36).slice(2);
};

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const userResponse = await fetch(BASE_URL);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }
      const users = await userResponse.json();

      const existingUser = users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          user.role === role,
      );

      if (!existingUser) {
        return rejectWithValue("Invalid Credentials");
      }

      return existingUser;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

// Register New User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const userResponse = await fetch(BASE_URL);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }
      const users = await userResponse.json();

      const existingUser = users.find((user) => user.email === newUser.email);

      if (existingUser) {
        return rejectWithValue("User Already Exists");
      }

      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to register new user");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

// Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrent",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch current user details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authData = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;

      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = false;
        state.isAuthenticated = true;
        state.token = getTokenData();
        const { password, ...safeUserData } = action.payload;

        state.authData = safeUserData;
        state.currentUser = safeUserData;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: safeUserData,
            currentUser: safeUserData,
            isAuthenticated: true,
            token: state.token,
          }),
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading.register = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading.register = false;
        state.isAuthenticated = true;
        state.token = getTokenData();

        const { password, ...safeUserData } = action.payload;

        state.authData = safeUserData;
        state.currentUser = safeUserData;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: safeUserData,
            currentUser: safeUserData,
            isAuthenticated: true,
            token: state.token,
          }),
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading.register = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading.current = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading.current = false;
        state.isAuthenticated = true;
        state.token = getTokenData();
        const { password, ...safeUserData } = action.payload;

        state.authData = safeUserData;
        state.currentUser = safeUserData;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: safeUserData,
            currentUser: safeUserData,
            isAuthenticated: true,
            token: state.token,
          }),
        );
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading.current = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
