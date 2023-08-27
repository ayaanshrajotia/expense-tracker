import { getResponseMessage } from "../../../../helper/response";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../helper/connectDB";

connectDB();

export const POST = async (request) => {
    const { email, password } = await request.json();

    try {
        const user = await User.findOne({ email: email });

        if (!user) throw new Error("User not found");
        console.log(user);

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) throw new Error("Invalid password");

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                name: user.name,
            },
            process.env.JWT_KEY
        );

        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    email,
                    token,
                },
                success: true,
            },
            { status: 200 }
        );

        response.cookies.set("authToken", token, {
            expiresIn: "1d",
            httpOnly: true,
        });

        return response;
    } catch (error) {
        return getResponseMessage(error.message, false, 500);
    }
};
