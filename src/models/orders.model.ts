import mongoose, { Schema, Document, Types } from "mongoose";
import { OrderItems } from "./orderItem.model";

export interface Order extends Document {
    grandTotal: number;
    status: "pending" | "completed" | "cancelled"; // Enum status
    createdBy: Types.ObjectId; // Referensi ke pengguna
    orderItems: Types.ObjectId[] | OrderItems[]; // Relasi ke detail item
    createdAt?: Date;
    updatedAt?: Date;
}

const OrderSchema = new Schema<Order>(
    {
        grandTotal: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        orderItems: [{ type: Schema.Types.ObjectId, ref: "OrderItems", required: true }],
    },
    {
        timestamps: true, // Untuk createdAt dan updatedAt
    }
);

const OrdersModel = mongoose.model<Order>("Orders", OrderSchema);

export default OrdersModel;
