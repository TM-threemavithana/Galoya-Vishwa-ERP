import express from 'express';
import {
  addDistribution,
  getDistributions,
  updateDistribution,
  deleteDistribution
} from '../controllers/distributionController.js';

const router = express.Router();

router.route('/')
  .post(addDistribution)
  .get(getDistributions);

router.route('/:id')
  .put(updateDistribution)
  .delete(deleteDistribution);

export default router;