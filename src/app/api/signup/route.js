import { connectDB } from "@/helper/connectDB";
import { getResponseMessage } from "@/helper/response";
import User from "@/models/user";
import bcrypt from "bcrypt";

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

        const createdUser = await User.create({
            username,
            name,
            email,
            password: hashedPassword,
        });

        return getResponseMessage(createdUser, true, 201);
    } catch (error) {
        return getResponseMessage(error.message, false, 404);
    }
};
