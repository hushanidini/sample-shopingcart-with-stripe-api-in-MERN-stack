import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify';
import {setHeaders} from './api';

const initialState = {
    items: [],
    status: null,
    createStatus: null,
    error: null,
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (id=null, { rejectWithValue }) => {
        try{
            const response = await axios.get('http://localhost:5000/api/products');
            return response?.data;
        }catch(err){
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            // return rejectWithValue(err.response.data)
            return rejectWithValue('an error occured!')
        }
        
    }
);

export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values, {rejectWithValue}) => {
        try{
            const response = await axios.post('http://localhost:5000/api/products', values, setHeaders());
            console.log(response)
            return response?.data;
        }catch(err){
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            // return rejectWithValue(err.response.data)
            console.log(err)
            toast.error('An error occured!', {
                position: 'top-left'
            })
             return rejectWithValue('an error occured!')
        }
        
    }
);
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {// add your non-async reducers here
    },
    extraReducers: (builder) => {
        builder.addCase(productsFetch.pending, (state,action) => {
            return {...state, status: "pending"};
        });
        builder.addCase(productsFetch.fulfilled, (state,action) => {
            if(action.payload){

                return { ...state, 
                    items:action.payload, 
                    status: "success",
                }
           
            }else return state;
        });
        builder.addCase(productsFetch.rejected, (state,action) => {
            return{
                ...state,
                status: "rejected",
                error:action.payload.error,
            }
        });

        //create product

        builder.addCase(productsCreate.pending, (state,action) => {
            return {...state, createStatus: "pending"};
        });

        builder.addCase(productsCreate.fulfilled, (state,action) => {
            if(action.payload){

                return { ...state, 
                    items: state.items.push(action.payload), 
                    createStatus: "success",
                }
                
            }else return state;
        });

        builder.addCase(productsCreate.rejected, (state,action) => {
            return{
                ...state,
                createStatus: "rejected",
                error:action.payload.error,
            }
        });
    }
    // extraReducers: {
    //      // you can mutate state directly, since it is using immer behind the scenes
    //     [productsFetch.pending]: (state, action) => {
    //         state.status = "pending"
    //     },
    //     [productsFetch.fulfilled]: (state, action) => {
    //         state.status = "success"
    //         state.items = action.payload
    //     },
    //     [productsFetch.rejected]: (state, action) => {
    //         state.status = "rejected"
    //         state.error = action.payload
    //     },
    //     [productsCreate.pending]: (state, action) => {
    //         state.createStatus = "pending";
    //     },
    //     [productsCreate.fulfilled]: (state, action) => {
    //         state.items.push(action.payload)
    //         state.createStatus = "success"
    //         toast.success('Product created', {
    //             position: "top-left"
    //         })
    //     },
    //     [productsCreate.rejected]: (state, action) => {
    //         state.createStatus = "rejected";
    //         state.error = action.payload;
    //     }
    // }
});
export default productSlice.reducer;
