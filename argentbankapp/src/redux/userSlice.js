import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PROFILE_URL } from "../utils/api";
import { getStoredUser, setStoredUser } from "../utils/storedUser";

const initialState = {
  token: localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('token') : null,  // ✅ Récupération du token,
  user: getStoredUser(),
};

// Si je modifie la valeur de token a null, user est récupéré depuis localStorage via getStoredUser()
// Mais token est toujours null, car il n’est pas récupéré depuis localStorage. ❌
// Résultat : Redux pense que l’utilisateur est déconnecté et le redirige vers /login.

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
      setStoredUser(token, user, rememberMe)
    },
    cleanup: (state) => {
      state.token = null;
      state.user = null;
    }
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

export const { setUser, cleanup } = userSlice.actions;
export const userReducer = userSlice.reducer;
