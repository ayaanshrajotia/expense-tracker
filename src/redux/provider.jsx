"use client";

import { useEffect } from "react";
import getCurrentUser from "../services/authUser";
import { getUser } from "./features/auth-slice";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";

const ReduxProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
