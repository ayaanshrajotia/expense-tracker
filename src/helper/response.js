import { NextResponse } from "next/server";

export const getResponseMessage = (messageText, successStatus, statusCode) => {
    return NextResponse.json(
        {
            message: messageText,
            success: successStatus,
        },
        {
            status: statusCode,
        }
    );
};
