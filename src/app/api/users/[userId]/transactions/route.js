import { getResponseMessage } from "@/helper/response";
import { TransactionEntry } from "@/models/transactionEntry";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { userId } = params;

        const user = await User.findById(userId);

        if (!user) throw new Error("No user found");

        const transactions = await TransactionEntry.find({ user: userId });

        if (transactions.length === 0)
            return NextResponse.json({ message: "No transactions found" });

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
        const { amount, remark, category, paymentMode, type } =
            await request.json();
        const { userId } = params;

        const d = new Date();

        const entry = await TransactionEntry.create({
            amount,
            remark,
            category,
            paymentMode,
            type,
            date: d,
            user: userId,
        });

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
