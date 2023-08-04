import { getResponseMessage } from "@/helper/response";
import { TransactionEntry } from "@/models/transactionEntry";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { userId, transactionId } = params;

    try {
        const user = await User.findOne({ _id: userId });
        const tran = await TransactionEntry.findOne({ _id: transactionId });

        if (!user) throw new Error("No user found");

        if (!tran) throw new Error("No transaction found");

        return NextResponse.json(
            { message: tran, success: true },
            { status: 200 }
        );
    } catch (error) {
        return getResponseMessage(
            `Failed to get transaction: ${error.message}`,
            false,
            404
        );
    }
};

export const DELETE = async (request, { params }) => {
    const { userId, transactionId } = params;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) throw new Error("No user found");

        const deletedTransaction = await TransactionEntry.deleteOne({
            _id: transactionId,
        });
        if (!deletedTransaction) throw new Error("No transaction found");

        return NextResponse.json(
            {
                message: "Transaction deleted successfully",
                deletedTransaction,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return getResponseMessage(
            `Failed to delete transaction: ${error.message}`,
            false,
            404
        );
    }
};

export const PUT = async (request, { params }) => {
    const { userId, transactionId } = params;
    const { amount, remark, category, paymentMode, type } =
        await request.json();

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) throw new Error("No user found");
        const transaction = await TransactionEntry.findOne({
            _id: transactionId,
        });
        if (!transaction) throw new Error("No transaction found");

        transaction.amount = amount || transaction.amount;
        transaction.remark = remark || transaction.remark;
        transaction.category = category || transaction.category;
        transaction.paymentMode = paymentMode || transaction.paymentMode;
        transaction.type = type || transaction.type;

        await transaction.save();

        return NextResponse.json(
            {
                message: "Transaction updated successfully",
                transaction,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return getResponseMessage(
            `Failed to update transaction: ${error.message}`,
            false,
            404
        );
    }
};
