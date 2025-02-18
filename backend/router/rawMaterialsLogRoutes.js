import express from 'express';
import { addRawMaterialsLog, getRawMaterialsLogs } from '../controllers/rawMaterialsLogController.js';

const router = express.Router();

router.route('/')
  .post(addRawMaterialsLog)
  .get(getRawMaterialsLogs);

export default router;