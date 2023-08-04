import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "expense-tracker",
        });

        console.log("Database connection established ");
    } catch (error) {
        console.log(error.message);
    }
}
