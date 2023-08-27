"use client";

import { useEffect, useState } from "react";
import TransactionContainer from "../components/TransactionContainer";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import {
    showTransactions,
    deleteTransaction,
} from "../../redux/features/transactions-slice";

const Transactions = () => {
    const dispatch = useDispatch();

    const { transactions, isLoading } = useSelector(
        (state) => state.transactions
    );

    useEffect(() => {
        dispatch(showTransactions());
    }, []);

    return (
        <div className="py-8 w-[75vw] mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-8">Transactions</h1>
                <Link href={"/create-transaction"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-8 h-8 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </Link>
            </div>
            <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-xl font-medium">12/8/2023</h2>
                <div className="flex flex-col gap-4 h-[65vh] overflow-scroll no-scrollbar">
                    {isLoading ? (
                        <Skeleton count={5} className="" height={48} />
                    ) : (
                        transactions?.map((transaction) => (
                            <TransactionContainer
                                key={transaction._id}
                                id={transaction._id}
                                remark={transaction.remark}
                                amount={transaction.amount}
                                date={transaction.date}
                                type={transaction.type}
                                category={transaction.category}
                                paymentMode={transaction.paymentMode}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
