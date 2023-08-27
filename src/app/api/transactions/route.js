import { getResponseMessage } from "../../../helper/response";
import { TransactionEntry } from "../../../models/transactionEntry";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../helper/connectDB";

connectDB();

export const GET = async (request, { params }) => {
    try {
        const authToken = request.cookies.get("authToken")?.value;
        const data = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await User.findById(data._id).select("-password");

        if (!user) throw new Error("No user found");

        const transactions = await TransactionEntry.find({ user: data._id });

        return getResponseMessage(transactions, true, 200);
    } catch (error) {
        return getResponseMessage(
            `Failed to get transactions: ${error.message}`,
            false,
            404
        );
    }
};

export const POST = async (request, { params }) => {
    try {
        const { amount, remark, category, paymentMode, type, date } =
            await request.json();

        // getting token from cookies
        const authToken = await request.cookies.get("authToken")?.value;
        const u = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await User.findById(u._id).select("-password");

        const entry = await TransactionEntry.create({
            amount,
            remark,
            category,
            paymentMode,
            type,
            date,
            paymentMode,
            user: u._id,
        });

        user.balance += parseInt(amount);
        await user.save();

        return NextResponse.json(
            {
                message: "Task added successfully",
                entry,
                success: true,
            },
            { status: 201 }
        );
    } catch (error) {
        return getResponseMessage(`Failed: ${error.message}`, false, 404);
    }
};
