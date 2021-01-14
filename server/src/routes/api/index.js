import express from 'express';
import usersRoutes from './users.js';
import messagesRoutes from './messages.js';
const router = express.Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);

export default router;
