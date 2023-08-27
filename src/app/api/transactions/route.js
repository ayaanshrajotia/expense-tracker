import { getResponseMessage } from "../../../helper/response";
import { TransactionEntry } from "../../../models/transactionEntry";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../helper/connectDB";
import Category from "../../../models/category";

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

        const parsedAmount = parseInt(amount);

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

        console.log(entry);

        const existingCat = await Category.findOne({
            name: category.toLowerCase(),
            user: u._id,
        });

        if (!existingCat) {
            await Category.create({
                name: category.toLowerCase(),
                user: req.user._id,
            });
        }

        if (type === "expense" && existingCat.limit === 0) {
            existingCat.spent += parsedAmount;
        }
        if (type === "expense" && existingCat.limit > 0) {
            existingCat.remaining = existingCat.limit - parsedAmount;
        }

        existingCat.transactions.push(entry._id);
        await existingCat.save();

        if (type === "expense") {
            if (paymentMode === "upi") {
                user.upi += parsedAmount;
            } else if (paymentMode === "cash") {
                user.cash += parsedAmount;
            } else if (paymentMode === "card") {
                user.card += parsedAmount;
            }
            user.expense += parsedAmount;
        } else if (type === "income") {
            if (paymentMode === "card") {
                user.card += parsedAmount;
            } else if (paymentMode === "upi") {
                user.upi += parsedAmount;
            } else if (paymentMode === "cash") {
                user.cash += parsedAmount;
            }
            user.income += parsedAmount;
        } else if (type === "savings") {
            if (paymentMode === "card") {
                user.card += parsedAmount;
            } else if (paymentMode === "upi") {
                user.upi += parsedAmount;
            } else if (paymentMode === "cash") {
                user.cash += parsedAmount;
            }
            user.savings += parsedAmount;
        }

        user.balance =
            (user.income || 0) + (user.savings || 0) - (user.expense || 0);

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
