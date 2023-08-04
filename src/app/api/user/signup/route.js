import { connectDB } from "@/helper/connectDB";
import { getResponseMessage } from "@/helper/response";
import Category from "@/models/category";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (request) => {
    try {
        const { username, name, email, password } = await request.json();

        const existedEmail = await User.findOne({ email: email });
        const existedUsername = await User.findOne({ username: username });

        if (existedEmail) throw new Error("Email already exists");

        if (existedUsername) throw new Error("Username already exists");

        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.saltRounds)
        );

        const category1 = await Category.create({
            name: "transportation",
            transactions: [],
        });

        const category2 = await Category.create({
            name: "entertainment",
            transactions: [],
        });
        const category3 = await Category.create({
            name: "food",
            transactions: [],
        });
        const category4 = await Category.create({
            name: "health",
            transactions: [],
        });
        const category5 = await Category.create({
            name: "self",
            transactions: [],
        });
        const category6 = await Category.create({
            name: "groceries",
            transactions: [],
        });
        const category7 = await Category.create({
            name: "bills",
            transactions: [],
        });
        const category8 = await Category.create({
            name: "stationary",
            transactions: [],
        });
        const category9 = await Category.create({
            name: "shopping",
            transactions: [],
        });
        const category10 = await Category.create({
            name: "gift",
            transactions: [],
        });

        await User.create({
            username,
            name,
            email,
            password: hashedPassword,
        });

        const user = await User.findOne({ email: email });

        if (!user)
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 200 }
            );

        user.categories.push(category1);
        user.categories.push(category2);
        user.categories.push(category3);
        user.categories.push(category4);
        user.categories.push(category5);
        user.categories.push(category6);
        user.categories.push(category7);
        user.categories.push(category8);
        user.categories.push(category9);
        user.categories.push(category10);

        await user.save();

        return getResponseMessage(user, true, 201);
    } catch (error) {
        return getResponseMessage(error.message, false, 404);
    }
};
