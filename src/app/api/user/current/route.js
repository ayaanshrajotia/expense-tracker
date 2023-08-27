import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../../models/user";
import { connectDB } from "../../../../helper/connectDB";

connectDB();

export async function GET(request) {
    const authToken = request.cookies.get("authToken")?.value;

    if (!authToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the authToken is empty or undefined
    if (!authToken.trim()) {
        return NextResponse.json({ error: "Empty token" }, { status: 400 });
    }

    try {
        const data = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await User.findById(data._id).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}
