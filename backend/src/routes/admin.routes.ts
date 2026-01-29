import { Router } from 'express';
import {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    updateUserRole
} from '../controllers/admin.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = Router();

// Protect all routes
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.route('/users/:id')
    .delete(deleteUser);

router.put('/users/:id/role', updateUserRole);

export default router;
