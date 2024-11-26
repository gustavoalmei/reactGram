import authService from "../services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  success: false,
  error: false,
  loading: false,
};

// Register an user and sign in
export const register = createAsyncThunk(
  "auth/register", // auth é o nome da entidade (autenticação), e register é a acão atual
  async (user, thunkAPI) => {
    // thunkAPI nos permite utilizar algumas funções extras como, parar a execução e identificar um erro da API
    const data = await authService.register(user);
    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]); // estamos rejeitando a requisição pois ouve algum errado manualmente.
    }

    return data;
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user);

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Parte das execuções que fazemos na API
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
