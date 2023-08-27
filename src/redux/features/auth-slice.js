import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, getUserLogout } from "../../services/authUser";
import axios from "axios";

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const registerUser = createAsyncThunk(
    "registerUser",
    async (userData, thunkAPI) => {
        console.log("thunk worked");
        try {
            return await axios.post("/api/user/login", userData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchUser = createAsyncThunk("fetchUser", async () => {
    return await getCurrentUser();
});

export const logoutUser = createAsyncThunk("logoutUser", async () => {
    return await getUserLogout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        logOut: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.data.user;
                console.log(state.user);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                console.log(action.error.message);
                if (
                    action.error.message ===
                    "Request failed with status code 401"
                ) {
                    state.isError = "Access Denied! Invalid Credentials";
                }
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                console.log("user logout in redux");
                state.user = null;
            });
    },
});

export const { logIn, reset, logOut } = authSlice.actions;
export default authSlice.reducer;
