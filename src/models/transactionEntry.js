import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    remark: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    paymentMode: {
        type: String,
    },
    type: {
        type: String,
        enum: ["income", "expense", "savings"],
        required: true,
    },
    time: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// const dateSchema = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   transactions: [
//     {
//       type: entrySchema,
//       required: true,
//     },
//   ],
// });

export const TransactionEntry =
    mongoose.models.transaction || mongoose.model("transaction", entrySchema);
