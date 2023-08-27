import jwt from "jsonwebtoken";
import User from "../../../models/user";
import { connectDB } from "../../../helper/connectDB";
import Category from "../../../models/category";
import { NextResponse } from "next/server";

connectDB();

export const GET = async (request) => {
    try {
        const authToken = request.cookies.get("authToken")?.value;
        const data = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await User.findById(data._id).select("-password");

        if (!user) throw new Error("No user found");

        const category = await Category.find({ user: data._id });

        return NextResponse.json({ category }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 404 });
    }
};
