import { connectDB } from "../../../../helper/connectDB";
import { getResponseMessage } from "../../../../helper/response";
import bcrypt from "bcrypt";
import Category from "../../../../models/category";
import { NextResponse } from "next/server";
import User from "../../../../models/user";

connectDB();

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();

        const existedEmail = await User.findOne({ email: email });

        if (existedEmail) throw new Error("Email already exists");

        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.saltRounds)
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const category1 = await Category.create({
            name: "transportation",
            transactions: [],
            user: user._id,
        });

        const category2 = await Category.create({
            name: "entertainment",
            transactions: [],
            user: user._id,
        });
        const category3 = await Category.create({
            name: "food",
            transactions: [],
            user: user._id,
        });
        const category4 = await Category.create({
            name: "health",
            transactions: [],
            user: user._id,
        });
        const category5 = await Category.create({
            name: "self",
            transactions: [],
            user: user._id,
        });
        const category6 = await Category.create({
            name: "groceries",
            transactions: [],
            user: user._id,
        });
        const category7 = await Category.create({
            name: "bills",
            transactions: [],
            user: user._id,
        });
        const category8 = await Category.create({
            name: "stationary",
            transactions: [],
        });
        const category9 = await Category.create({
            name: "shopping",
            transactions: [],
            user: user._id,
        });
        const category10 = await Category.create({
            name: "gift",
            transactions: [],
            user: user._id,
        });

        if (!user)
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 200 }
            );

        // user.categories.push(category1);
        // user.categories.push(category2);
        // user.categories.push(category3);
        // user.categories.push(category4);
        // user.categories.push(category5);
        // user.categories.push(category6);
        // user.categories.push(category7);
        // user.categories.push(category8);
        // user.categories.push(category9);
        // user.categories.push(category10);

        await user.save();

        return getResponseMessage(user, true, 201);
    } catch (error) {
        return getResponseMessage(error.message, false, 404);
    }
};
