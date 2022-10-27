import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {endpointUrl} from '../store/api';
import jwtDecode from 'jwt-decode';

const initialState = {
    token:localStorage.getItem('onlineShope_token'),
    name: "",
    email: "",
    _id: "",
    isAdmin: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
   async (value, {rejectWithValue}) => {
        try{
            const token = await axios.post(`${endpointUrl}/api/register`,{
                name:value.name,
                email: value.email,
                password: value.password
            });
            localStorage.setItem('onlineShope_token', JSON.stringify(token?.data?.accessToken));
            return token?.data?.accessToken;
        }catch(err){
            console.log(err.response.data)
            return rejectWithValue(err.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
   async (value, {rejectWithValue}) => {
        try{
            const token = await axios.post(`${endpointUrl}/api/login`,{
                email: value.email,
                password: value.password
            });
            localStorage.setItem('onlineShope_token', JSON.stringify(token?.data?.accessToken));
            return token?.data?.accessToken;
        }catch(err){
            console.log(err.response.data)
            return rejectWithValue(err.response.data)
        }
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state,action){
            const token = state.token

            if(token){
                const user = jwtDecode(token);

                return { 
                    ...state, 
                    token, 
                    name: user.name, 
                    email:user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    userLoaded: true,
                }
            }
        },
        logoutUser(state,action){
            localStorage.removeItem('onlineShope_token');
            return {
                token: "",
                name: "",
                email: "",
                _id: "",
                isAdmin: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state,action) => {
            return {...state, registerStatus: "pending"};
        });
        builder.addCase(registerUser.fulfilled, (state,action) => {
            if(action.payload){
                const user = jwtDecode(action.payload);

                return { ...state, 
                    token:action.payload, 
                    name: user.name, 
                    email:user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    registerStatus: "success",
                }
            }else return state;
        });
        builder.addCase(registerUser.rejected, (state,action) => {
            return{
                ...state,
                registerStatus: "rejected",
                registerError:action.payload.error,
            }
        });

        // login
        builder.addCase(loginUser.pending, (state,action) => {
            return { ...state, loginStatus: "pending"}
        });
        builder.addCase(loginUser.fulfilled, (state,action) => {
            if(action.payload){
                const user = jwtDecode(action.payload);

                return { ...state, 
                    token:action.payload, 
                    name: user.name, 
                    email:user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    loginStatus: "success",
                }
            }else return state;
        });
        builder.addCase(loginUser.rejected, (state,action) => {
            return{
                ...state,
                loginStatus: "rejected",
                loginError:action.payload.error,
            }
        });
    }
});

export const {loadUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;