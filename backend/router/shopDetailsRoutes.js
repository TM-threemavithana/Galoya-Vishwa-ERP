import express from 'express';
import { createShopDetails, getShopDetails } from '../controllers/shopController.js';

const router = express.Router();

// Define the POST route for creating shop details
router.post('/', createShopDetails);

// Define the GET route for fetching all shop details
router.get('/', getShopDetails);

export default router;