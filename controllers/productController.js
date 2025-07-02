import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
    try {
        const  { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required" });
            case !description:
                return res.status(400).send({ error: "Description is required" });
            case !price:
                return res.status(400).send({ error: "Price is required" });
            case !category:
                return res.status(400).send({ error: "Category is required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(400).send({ error: "Photo should be less than 1mb" });
        }

        const products = new productModel({
            ...req.fields,
            slug: slugify(name, { lower: true }),

        });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        };

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products,
            
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error:error.message,
        });
    }
};
    
// get products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount:products.length,
            message: " All Products ",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching products",
            error: error.message,
        });
    }
};

// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching single product",
            error: error.message,
        });
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching product photo",
            error: error.message,
        });
    }
};

// delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error: error.message,
        });
    }
}

// update product
export const updateProductController = async (req, res) => {
    try {
        const  { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required" });
            case !description:
                return res.status(400).send({ error: "Description is required" });
            case !price:
                return res.status(400).send({ error: "Price is required" });
            case !category:
                return res.status(400).send({ error: "Category is required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(400).send({ error: "Photo should be less than 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields,
            slug: slugify(name, { lower: true }),
        }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        };

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products,
            
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update product",
            error:error.message,
        });
    }
}
