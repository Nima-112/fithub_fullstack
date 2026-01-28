import { Router } from 'express';
import {
    getProducts,
    getProductById,
    getFeaturedProducts,
    getCategories,
    getBrands,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/:id', getProductById);

// Admin routes (TODO: Add auth middleware)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
