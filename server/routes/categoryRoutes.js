import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController,
     createCategoryController,
      deleteCategoryController,
      singleCategoryController,
      updateCategoryController } from '../controllers/categoryController.js';


const router = express.Router();
//routes 
// Create category route
router.post(
    "/create-category",
     requireSignIn,
     isAdmin,
    createCategoryController
);

//update category route
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
)

// Get all categories route
router.get(
    "/get-category",
    categoryController
);

// Get single category route
router.get(
    "/single-category/:slug",
    singleCategoryController
);

// delete category route
router.delete(
    "/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController
);
export default router;