import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    message: "",
};

// fetch all transactions
export const showTransactions = createAsyncThunk(
    "showTransactions",
    async (data, { rejectWithValue }) => {
        try {
            const response = axios.get("/api/transactions");

            return (await response).data.message;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// create a new transaction
export const createTransactions = createAsyncThunk(
    "createTransactions",
    async (data, { rejectWithValue }) => {
        console.log(data);
        try {
            const response = await axios.post("/api/transactions", data);

            return response.data.entry;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// delete the transaction
export const deleteTransaction = createAsyncThunk(
    "deleteTransactions",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/transactions/${data}`);

            return response.data.deletedTransaction;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// update the transaction
export const updateTransaction = createAsyncThunk(
    "updateTransaction",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/transactions/${data.id}`,
                data.updatedTrans
            );
            return response.data.transaction;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransactions.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.error.message);
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(showTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(showTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(showTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                const id = action.payload._id;

                if (id) {
                    state.transactions = state.transactions.filter(
                        (ele) => ele._id !== id
                    );
                }
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = state.transactions.map((trans) =>
                    trans._id === action.payload._id ? action.payload : trans
                );
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { getTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
