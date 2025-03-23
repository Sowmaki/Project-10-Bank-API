import { createSlice } from "@reduxjs/toolkit";

const setStoredUser = (token, user, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('rememberMe', 'false');
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user, rememberMe } = action.payload;
      state.token = token;
      state.user = user;
      setStoredUser(token, user, rememberMe); // 🔹 Stocker les valeurs propres
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
