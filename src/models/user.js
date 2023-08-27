import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
        min: -1000000, // allow values as low as -1,000,000
    },
    income: {
        type: Number,
        default: 0,
        min: -1000000, // allow values as low as -1,000,000
    },
    expense: {
        type: Number,
        default: 0,
        min: -1000000, // allow values as low as -1,000,000
    },
    savings: {
        type: Number,
        default: 0,
    },
    cash: {
        type: Number,
        default: 0,
    },
    upi: {
        type: Number,
        default: 0,
    },
    card: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            default: [],
        },
    ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
