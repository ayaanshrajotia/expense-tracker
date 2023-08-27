"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { categories } from "../../helper/customCategories";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { textFormatter } from "../../helper/dateFormatter";
import { useDispatch } from "react-redux";
import { createTransactions } from "../../redux/features/transactions-slice";

const CreateForm = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const [transaction, setTransaction] = useState({
        remark: "",
        amount: "",
        type: "",
        category: "",
        paymentMode: "",
        date: new Date(),
    });

    const doCreate = async (e) => {
        e.preventDefault();
        try {
            dispatch(createTransactions(transaction));
            toast.success("Successfully created transaction");
            setTransaction({ remark: "", amount: "", type: "", category: "" });
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to create transaction");
        }
    };

    const doSave = async () => {
        try {
            dispatch(createTransactions(transaction));
            toast.success("Successfully created transaction");
            router.push("/transactions");
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
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        autoComplete="off"
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
                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Remark
                    </label>
                </div>
                {/* Amount */}
                <div className="relative z-0 w-full mb-7 group">
                    <input
                        data-lpignore
                        type="text"
                        name="floating_password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
                        placeholder=" "
                        required
                        autoComplete="off"
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
                        className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Amount
                    </label>
                </div>
                {/* Category */}
                <div className="relative w-full mb-6">
                    <button
                        className="w-full flex items-center rounded-lg justify-between "
                        type="button"
                        onClick={() => setShow(!show)}
                    >
                        <h3 className="font-medium text-gray-900">
                            {transaction.category
                                ? textFormatter(transaction.category)
                                : "Category"}
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <ul
                        className={`w-full absolute z-[1000] float-left m-0 mt-2 min-w-max list-none overflow-hidden rounded-lg border-[1px] bg-white bg-clip-padding text-left text-base shadow-lg transition-all ${
                            show ? "block" : "hidden"
                        }`}
                    >
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-3 text-neutral-700 hover:bg-neutral-100 transition-all active:text-neutral-800 active:no-underline cursor-pointer"
                                value={cat}
                                onClick={(e) => {
                                    setTransaction({
                                        ...transaction,
                                        category: cat,
                                    });
                                    setShow(!show);
                                }}
                            >
                                {textFormatter(cat)}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Type */}
                <div className="relative z-0 w-full mb-7 group">
                    <h3 className="mb-4 font-medium text-gray-900">Type</h3>
                    <ul className="items-center w-full text-sm font-medium bg-white border border-gray-200 rounded-lg sm:flex  z-10 relative">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-id"
                                    type="radio"
                                    value="income"
                                    name="type"
                                    className="w-4 h-4  bg-gray-100 border-gray-300 "
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-id"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                                >
                                    Income
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-millitary"
                                    type="radio"
                                    value="expense"
                                    name="type"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-millitary"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
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
                                    name="type"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            type: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-passport"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                                >
                                    Savings
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* PaymentMode */}
                <div className="relative z-0 w-full mb-7 group">
                    <h3 className="mb-4 font-medium text-gray-900">
                        Payment Mode
                    </h3>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-id1"
                                    type="radio"
                                    value="upi"
                                    name="paymentMode"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            paymentMode: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-id1"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                                >
                                    UPI
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-millitary1"
                                    type="radio"
                                    value="cash"
                                    name="paymentMode"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            paymentMode: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-millitary1"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                                >
                                    Cash
                                </label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    id="horizontal-list-radio-passport1"
                                    type="radio"
                                    value="card"
                                    name="paymentMode"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                    onChange={(e) =>
                                        setTransaction({
                                            ...transaction,
                                            paymentMode: e.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="horizontal-list-radio-passport1"
                                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                                >
                                    Card
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Date & Time */}
                <div className="relative z-0 w-full mb-7 group">
                    <h3 className="mb-4 text-gray-900 font-medium">
                        Date & Time
                    </h3>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                        </svg>
                        <DatePicker
                            className="cursor-pointer outline-none text-lg font-light"
                            showTimeSelect
                            dateFormat="Pp"
                            selected={transaction.date}
                            onChange={(d) =>
                                setTransaction({
                                    ...transaction,
                                    date: d,
                                })
                            }
                        />
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-evenly w-full">
                    <button
                        onClick={doSave}
                        type="button"
                        className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                    >
                        Create
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                    >
                        Save & Create New
                    </button>
                </div>
            </form>
            {/* {JSON.stringify(transaction)} */}
        </div>
    );
};

export default CreateForm;
