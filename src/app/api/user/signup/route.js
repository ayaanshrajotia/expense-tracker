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

        if (!user)
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 200 }
            );

        await user.save();

        console.log("api called");
        return NextResponse.json({ user, success: true }, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 }
        );
    }
};
