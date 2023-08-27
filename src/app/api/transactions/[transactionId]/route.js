import { getResponseMessage } from "../../../../helper/response";
import { TransactionEntry } from "../../../../models/transactionEntry";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (request, { params }) => {
    const { transactionId } = params;

    try {
        // const user = await User.findOne({ _id: userId });
        const tran = await TransactionEntry.findOne({ _id: transactionId });

        // if (!user) throw new Error("No user found");

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
    const { transactionId } = params;

    const authToken = await request.cookies.get("authToken")?.value;

    const data = jwt.verify(authToken, process.env.JWT_KEY);

    try {
        const user = await User.findOne({ _id: data._id });

        if (!user) throw new Error("No user found");

        const deletedTransaction = await TransactionEntry.findOneAndDelete({
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
    const { transactionId } = params;
    const { amount, remark, category, paymentMode, type, date } =
        await request.json();

    try {
        // const user = await User.findOne({ _id: userId });
        // if (!user) throw new Error("No user found");
        const transaction = await TransactionEntry.findOne({
            _id: transactionId,
        });
        if (!transaction) throw new Error("No transaction found");

        transaction.amount = amount || transaction.amount;
        transaction.remark = remark || transaction.remark;
        transaction.category = category || transaction.category;
        transaction.paymentMode = paymentMode || transaction.paymentMode;
        transaction.type = type || transaction.type;
        transaction.date = date || transaction.date;

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
