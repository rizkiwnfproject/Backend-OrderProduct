/**
 * src/services/product.service.ts
 */

import ProductsModel, { Product } from "../models/products.model";
import { Types } from "mongoose";

export const create = async (payload: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> => {
    const result = await ProductsModel.create(payload);
    return result.toObject(); 
};

export const findAll = async (): Promise<Product[]> => {
    const result = await ProductsModel.find().populate("categoryId"); 
    return result as Product[];
};

export const findOne = async (id: string): Promise<Product | null> => {
    const result = await ProductsModel.findById(id).populate("categoryId");
    return result as Product | null;
};

export const update = async (
    id: string,
    payload: Partial<Product>
): Promise<Product | null> => {
    const result = await ProductsModel.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    );
    return result as Product | null;
};

export const remove = async (id: string): Promise<Product | null> => {
    const result = await ProductsModel.findByIdAndDelete(id);
    return result as Product | null;
};