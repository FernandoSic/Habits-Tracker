import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRegisterUser, fetchLoginUser } from "./userAPI";

interface userThunk{
    username: string;
    password: string;
}
type user = {
    token: string;
}
type userState = {
    user: user | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}
const initialState: userState = {
    user: null,
    status: "idle",
    error: null
};

export const fetchRegisterUserThunk = createAsyncThunk("user/fetchRegisterUser", async ({username, password}: userThunk,  {rejectWithValue}) => {
    const response =  await fetchRegisterUser(username, password);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to register user");
    }else if(responseJson.message.toString() === "Usuario registrado correctamente"){
        return responseJson.message;
    }else{
        return rejectWithValue(responseJson.message);
    }
});

export const fetchLoginUserThunk = createAsyncThunk("user/fetchLoginUser", async ({username, password}: userThunk,  {rejectWithValue}) => {
    const response =  await fetchLoginUser(username, password);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to login user");
    }else if(responseJson.message.toString() === "Incio de sesión exitoso"){
        return responseJson.token;
    }else{
        return rejectWithValue(responseJson.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchRegisterUserThunk.fulfilled, (state, action) => {
            state.status = "success";
            state.user = null;
            state.error = action.payload as string;
            alert("Usuario registrado correctamente");
        }). addCase(fetchRegisterUserThunk.rejected, (state, action) => {
            state.status = "failed";
            state.user = null;
            state.error = action.payload as string;
            alert("No se puede registrar el usuario en este momento");
        }). addCase(fetchLoginUserThunk.rejected, (state, action) => {
            state.status = "failed";
            state.user = null;
            state.error = action.payload as string;
            alert("No se puede iniciar sesión en este momento");
        }). addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
            state.status = "success";
            state.user = action.payload;
            state.error = action.payload as string;
        });
    }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
