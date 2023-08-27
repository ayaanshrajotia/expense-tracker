"use client";

import React, { useEffect, useState } from "react";
import UpdateForm from "../../components/UpdateForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { categories } from "../../../helper/customCategories";
import { textFormatter } from "../../../helper/dateFormatter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../../redux/features/transactions-slice";

const page = ({ params }) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [cate, setCate] = useState("Category");
    const [updateTrans, setUpdateTrans] = useState({
        remark: "",
        amount: "",
        type: "",
        category: "",
        paymentMode: "",
    });
    const dispatch = useDispatch();

    const { transactions, isLoading } = useSelector(
        (state) => state.transactions
    );

    const handleCategory = (category) => {
        setUpdateTrans({ ...updateTrans, category: category });
    };

    const newData = (e) => {
        setUpdateTrans({ ...updateTrans, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (params.transactionId) {
            const trans = transactions.filter(
                (ele) => ele._id === params.transactionId
            );
            setUpdateTrans(trans[0]);
        }
    }, []);

    const doSave = async () => {
        try {
            dispatch(
                updateTransaction({
                    updatedTrans: updateTrans,
                    id: params.transactionId,
                })
            );
            toast.success("Successfully updated transaction");
            router.push("/transactions");
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to create transaction");
        }
    };

    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            {/* <UpdateForm trans={transaction} /> */}
            <div className="login w-[600px] p-8 rounded-md border">
                <form className="flex flex-col items-center" onSubmit={doSave}>
                    {/* Remark */}
                    <div className="relative z-0 w-full mb-7 group">
                        <input
                            type="text"
                            name="remark"
                            id="remark"
                            className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                            placeholder=" "
                            required
                            autoComplete="off"
                            value={updateTrans && updateTrans?.remark}
                            onChange={newData}
                        />
                        <label
                            htmlFor="remark"
                            className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin- peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Remark
                        </label>
                    </div>
                    {/* Amount */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="amount"
                            id="amount"
                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
                            placeholder=" "
                            required
                            value={updateTrans && updateTrans?.amount}
                            onChange={newData}
                        />
                        <label
                            htmlFor="amount"
                            className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin- peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                                {updateTrans && updateTrans?.category
                                    ? textFormatter(
                                          updateTrans && updateTrans?.category
                                      )
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
                                    name="category"
                                    value={cat}
                                    onClick={(e) => handleCategory(cat)}
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
                                        checked={
                                            updateTrans &&
                                            updateTrans?.type === "income"
                                        }
                                        className="w-4 h-4  bg-gray-100 border-gray-300 "
                                        onChange={newData}
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
                                        checked={
                                            updateTrans &&
                                            updateTrans?.type === "expense"
                                        }
                                        name="type"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                                        onChange={newData}
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
                                        checked={
                                            updateTrans &&
                                            updateTrans?.type === "savings"
                                        }
                                        name="type"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                        onChange={newData}
                                        d
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
                                        checked={
                                            updateTrans &&
                                            updateTrans?.paymentMode === "upi"
                                        }
                                        name="paymentMode"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        onChange={newData}
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
                                        checked={
                                            updateTrans &&
                                            updateTrans?.paymentMode === "cash"
                                        }
                                        name="paymentMode"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        onChange={newData}
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
                                        checked={
                                            updateTrans &&
                                            updateTrans?.paymentMode === "card"
                                        }
                                        name="paymentMode"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                        onChange={newData}
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
                                selected={new Date()}
                                onChange={(d) =>
                                    setUpdateTrans({
                                        ...updateTrans,
                                        date: d,
                                    })
                                }
                            />
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-evenly w-full">
                        <button
                            type="submit"
                            className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/transactions")}
                            className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;
