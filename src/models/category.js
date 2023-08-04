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
        ref: "user",
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transaction",
            default: [],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Category = mongoose.model("category", categorySchema);

export default Category;
