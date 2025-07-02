import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
import ExpressFormidable from 'express-formidable';


const router = express.Router();

//routes 
router.post(
    "/create-product",
    ExpressFormidable(),
    requireSignIn,
    isAdmin,
    createProductController
);

router.put(
    "/update-product/:pid",
    ExpressFormidable(),
    requireSignIn,
    isAdmin,
    updateProductController
);

// get products 
router.get('/get-product',getProductController); 

// get single product
router.get('/get-product/:slug',getSingleProductController); 

//get photo 
router.get('/product-photo/:pid', productPhotoController);

// delete product
router.delete('/delete-product/:pid', deleteProductController);

    export default router;

