import { Request, Response } from "express";
import { createOrder, getOrdersByUser } from "../services/order.service";
import { IRequestWithUser } from "../middlewares/auth.middleware";
import { IPaginationQuery } from "../utils/interfaces";

export default {
    async createOrder(req: IRequestWithUser, res: Response) {
        try {
            // Validasi input JSON
            const { orderItems } = req.body;
            if (!Array.isArray(orderItems) || orderItems.length === 0) {
                return res.status(400).json({
                    message: "orderItems harus berupa array dan tidak boleh kosong",
                });
            }
            for (const item of orderItems) {
                if (item.quantity < 1 || item.quantity > 5) {
                    return res.status(400).json({
                        message: "Quantity setiap item harus antara 1 dan 5",
                    });
                }
            }

            // Ambil ID pengguna dari token autentikasi
            if (!req.user || !req.user.id) {
                return res.status(403).json({ message: "Unauthorized access" });
            }
            const userId = req.user.id.toString();

            // Proses pembuatan order
            const newOrder = await createOrder({
                orderItems,
                createdBy: userId,
            });

            return res.status(200).json({
                message: "Order berhasil dibuat",
                order: newOrder,
            });
        } catch (error) {
            const err = error as Error;
            console.error(error);
            return res.status(500).json({
                message: "Terjadi kesalahan saat membuat order",
                error: err.message,
            });
        }
    },

    async getOrdersByUser(req: IRequestWithUser, res: Response) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(403).json({ message: "Unauthorized access" });
            }

            const userId = req.user.id.toString();
            const { page = 1, limit = 10, search = "" } = req.query as unknown as IPaginationQuery;

            const orders = await getOrdersByUser(userId, Number(page), Number(limit), search);

            res.status(200).json({
                message: "Riwayat order berhasil diambil",
                data: orders.orders,
                page: Number(page),
                limit: Number(limit),
                total: orders.totalOrders,
                totalPages: orders.totalPages,
            });
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
            return res.status(500).json({
                message: "Terjadi kesalahan saat mengambil riwayat order",
                error: err.message,
            });
        }
    }
}