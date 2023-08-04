import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    limit: {
        type: Number,
        default: 0,
    },
    spent: {
        type: Number,
        default: 0,
    },
    remaining: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            default: [],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
