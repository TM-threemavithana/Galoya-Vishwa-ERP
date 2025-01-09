import express from 'express';
import { createShopDetails } from '../controllers/shopController.js';

const router = express.Router();

// Define the POST route for creating shop details
router.post('/', createShopDetails);

export default router;