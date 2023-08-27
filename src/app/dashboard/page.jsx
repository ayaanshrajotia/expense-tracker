"use client";
import { useDispatch, useSelector } from "react-redux";
import { textFormatter } from "../../helper/dateFormatter.js";
import { useEffect } from "react";
import { fetchUser } from "../../redux/features/auth-slice.js";

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    const { user } = useSelector((state) => state.auth);

    return (
        <div className="py-8 w-[80vw] mx-auto">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            {user && (
                <div>
                    <h2 className="text-xl">
                        Welcome,{" "}
                        <span className="font-medium">
                            {textFormatter(user.name)}
                        </span>
                    </h2>
                    <div className="flex flex-col">
                        <span>balance: {user.balance}</span>
                        <span>income: {user.income}</span>
                        <span>expense: {user.expense}</span>
                    </div>
                </div>
            )}
            {JSON.stringify(user)}
        </div>
    );
};

export default Dashboard;
