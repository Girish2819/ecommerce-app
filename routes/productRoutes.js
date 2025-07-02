import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, getProductController } from '../controllers/productController.js';
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

// get products 
router.get('/get-product',getProductController); 

    export default router;

