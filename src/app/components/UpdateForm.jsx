"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateForm = ({ trans }) => {
    const [transaction, setTransaction] = useState({
        remark: trans.remark,
        amount: trans.amount,
        type: trans.type,
        category: trans.category,
    });
    console.log(trans);

    const doCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/transactions", transaction);
            toast.success("Successfully created transaction");
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to create transaction");
        }
    };
    return (
        <div className="login w-[600px] p-8 rounded-md border">
            <form className="flex flex-col items-center" onSubmit={doCreate}>
                {/* Remark */}
                <div className="relative z-0 w-full mb-7 group">
                    <input
                        data-lpignore
                        type="text"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        value={transaction.remark}
                        onChange={(e) =>
                            setTransaction({
                                ...transaction,
                                remark: e.target.value,
                            })
                        }
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Remark
                    </label>
                </div>
                {/* Amount */}
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        data-lpignore
                        type="text"
                        name="floating_password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-900 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
                        placeholder=" "
                        required
                        value={transaction.amount}
                        onChange={(e) =>
                            setTransaction({
                                ...transaction,
                                amount: e.target.value,
                            })
                        }
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Amount
                    </label>
                </div>
                {/* Category */}
                <div className="relative z-0 w-full mb-7 group">
                    <input
                        data-lpignore
                        type="text"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        value={transaction.category}
                        onChange={(e) =>
                            setTransaction({
                                ...transaction,
                                category: e.target.value,
                            })
                        }
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Category
                    </label>
                </div>
                {/* Type */}
                <div className="relative z-0 w-full mb-7 group">
                    <h3 className="text-sm mb-4 text-gray-900 dark:text-white">
                        Type
                    </h3>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-id"
                                    type="radio"
                                    value="income"
                                    checked={transaction.type === "income"}
                                    name="list-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-id"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Income
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-millitary"
                                    type="radio"
                                    value="expense"
                                    checked={transaction.type === "expense"}
                                    name="list-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-millitary"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Expense
                                </label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-passport"
                                    type="radio"
                                    value="savings"
                                    checked={transaction.type === "savings"}
                                    name="list-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            type: e.target.value,
                                        })
                                    }
                                    d
                                />
                                <label
                                    htmlFor="horizontal-list-radio-passport"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Savings
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                <button
                    type="submit"
                    className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                >
                    Create
                </button>
            </form>
            {JSON.stringify(transaction)}
        </div>
    );
};

export default UpdateForm;
