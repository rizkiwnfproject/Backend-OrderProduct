import express from "express";

import uploadMiddleware from "../middlewares/upload.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import uploadController from "../controllers/upload.controller";
import authController from "../controllers/auth.controller";
import productsController from "../controllers/products.controller";
import categoriesController from "../controllers/categories.controller";
import orderController from "../controllers/order.controller";

const router = express.Router();

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);


// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/me", authMiddleware, authController.me);
router.put("/auth/update-profile", authMiddleware, authController.updateProfile);

// order
router.get("/orders", authMiddleware, orderController.getOrdersByUser);
router.post("orders", authMiddleware, orderController.createOrder);


export default router;