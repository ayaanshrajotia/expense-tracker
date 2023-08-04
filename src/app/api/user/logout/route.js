import { NextResponse } from "next/server";

export const GET = async () => {
    const response = NextResponse.json({
        message: "Logged out",
        success: true,
    });

    response.cookies.set("authToken", "", {
        expiresIn: new Date(0),
    });

    return response;
};
