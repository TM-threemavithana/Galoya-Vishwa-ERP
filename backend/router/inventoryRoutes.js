import express from 'express';
import { addInventory, getInventories } from '../controllers/inventoryController.js';

const router = express.Router();

router.route('/').post(addInventory).get(getInventories);

export default router;