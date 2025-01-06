import express from 'express';
import {
  addStockReduction,
  getStockReductions,
  updateStockReduction,
  deleteStockReduction
} from '../controllers/stockReductionController.js';

const router = express.Router();

router.route('/')
  .post(addStockReduction)
  .get(getStockReductions);

router.route('/:id')
  .put(updateStockReduction)
  .delete(deleteStockReduction);

export default router;