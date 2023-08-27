import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";
import transactionSlice from "./features/transactions-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        transactions: transactionSlice,
    },
});
