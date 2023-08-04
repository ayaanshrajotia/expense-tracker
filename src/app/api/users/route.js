import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await User.find().select("-password");

        return NextResponse.json({
            message: users,
            success: true,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to get users",
                error: error.message,
                success: false,
            },
            { status: 404 }
        );
    }
}