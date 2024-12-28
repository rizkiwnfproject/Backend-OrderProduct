import OrdersModel, { Order } from "../models/orders.model";
import OrderItemsModel, { OrderItems } from "../models/orderItem.model";
import ProductsModel from "../models/products.model";
import { Types } from "mongoose";

export const createOrder = async (
    payload: {
        orderItems: { product: string; quantity: number }[];
        createdBy: Types.ObjectId | String;
    }
): Promise<any> => {
    const processedOrderItems = await Promise.all(
        payload.orderItems.map(async (item) => {
            const product = await ProductsModel.findById(item.product);
            if (!product) {
                throw new Error(`Produk dengan ID ${item.product} tidak ditemukan`);
            }

            if (item.quantity < 1 || item.quantity > 5) {
                throw new Error(`Quantity untuk produk ${product.name} harus antara 1 dan 5`);
            }

            if (item.quantity > product.qty) {
                throw new Error(`Stok produk ${product.name} tidak mencukupi`);
            }

            return {
                name: product.name,
                product: product._id,
                price: product.price,
                quantity: item.quantity,
                subTotal: product.price * item.quantity,
            };
        })
    );

    const grandTotal = processedOrderItems.reduce((total, item) => total + item.subTotal, 0);

    const savedOrderItems = await Promise.all(
        processedOrderItems.map(async (item) => {
            const newItem = await OrderItemsModel.create({
                ...item,
                order: null,
            });
            return newItem._id;
        })
    );

    const orderData = {
        grandTotal,
        orderItems: savedOrderItems,
        createdBy: new Types.ObjectId(payload.createdBy.toString()),
        status: "pending",
    };

    const order = await OrdersModel.create(orderData);

    await Promise.all(
        processedOrderItems.map(async (item) => {
            await ProductsModel.findByIdAndUpdate(
                item.product,
                { $inc: { qty: -item.quantity } },
                { new: true }
            );
        })
    );

    return {
        id: order._id,
        grandTotal: order.grandTotal,
        status: order.status,
        orderItems: processedOrderItems,
    };
};


export const getOrdersByUser = async (
    userId: string,
    page: number,
    limit: number,
    search: string
): Promise<any> => {
    const skip = (page - 1) * limit;

    // Query untuk pencarian jika ada parameter search
    const query: any = { createdBy: userId };
    if (search) {
        query["orderItems.name"] = { $regex: search, $options: "i" };
    }

    // Ambil data orders dengan pagination
    const orders = await OrdersModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
            path: "orderItems",
            populate: {
                path: "product",
                select: "name price", // Pilih field produk yang ditampilkan
            },
        });

    // Hitung total orders
    const totalOrders = await OrdersModel.countDocuments(query);

    return {
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
    };
};
