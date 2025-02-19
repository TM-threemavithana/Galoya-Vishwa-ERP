import express from 'express';
import { createReturnedItem } from '../controllers/returnedItemsController.js';

const router = express.Router();

// Define the POST route for creating returned items
router.post('/', createReturnedItem);

export default router;