import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PROFILE_URL } from "../utils/api";


const setStoredUser = (token, user) => {
  if (localStorage.getItem('rememberMe') === 'true') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const getStoredUser = () => {
  try {
    return localStorage.getItem('rememberMe') === 'true'
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  } catch (error) {
    console.error("Erreur de parsing du user depuis localStorage:", error);
    return null;
  }
};

const initialState = {
  token: localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('token') : null,
  user: getStoredUser(),
};

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ firstName, lastName, token }, { rejectWithValue }) => {
    try {
      if (!firstName || !lastName) {
        throw new Error("Les champs ne peuvent pas être vides.");
      }

      const response = await axios.put(
        API_PROFILE_URL,
        { firstName, lastName }, // Vérifie que les données sont bien envoyées
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.body;
    } catch (error) {
      console.error("Erreur API update profile:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user, rememberMe } = action.payload;
      state.token = token;
      state.user = user;

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('rememberMe', 'true');
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;

        // 🔹 Mettre à jour localStorage si rememberMe est activé
        setStoredUser(state.token, state.user);
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
