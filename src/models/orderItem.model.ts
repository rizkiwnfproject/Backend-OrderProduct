import mongoose, { Schema, Document, Types } from "mongoose";

export interface OrderItems extends Document {
    name: string; // Nama produk di saat order
    product: Types.ObjectId; // Referensi ke produk
    price: number; // Harga produk saat order
    quantity: number; // Jumlah yang dipesan
    subTotal: number; // Total harga item (price * quantity)
    order: Types.ObjectId; // Referensi ke order induk
}

const OrderItemsSchema = new Schema<OrderItems>(
    {
        name: { type: String, required: true },
        product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        order: { type: Schema.Types.ObjectId, ref: "Orders", required: false }, // Bisa null saat awal dibuat
    },
    {
        timestamps: true, // Untuk createdAt dan updatedAt
    }
);

const OrderItemsModel = mongoose.model<OrderItems>("OrderItems", OrderItemsSchema);

export default OrderItemsModel;

