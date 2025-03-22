import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (userCredentials, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:3001/api/v1/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userCredentials),
//       });

//       if (!response.ok) {
//         throw new Error("Échec de l'authentification");
//       }

//       const data = await response.json();
//       localStorage.setItem("token", data.token);
//       console.log(data);

//       const token = localStorage.getItem("token");

//       console.log("Token depuis localStorage : ", token);

//       return { user: data.body.user, token: data.token };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
