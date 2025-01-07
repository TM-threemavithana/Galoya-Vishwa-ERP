// filepath: /c:/academic/Software Project/backend/router/machineRepairRoutes.js
import express from 'express';
import {
  addMachineRepair,
  getMachineRepairs,
  updateMachineRepair,
  deleteMachineRepair,
} from '../controllers/machineRepairController.js';

const router = express.Router();

router.route('/')
  .post(addMachineRepair)
  .get(getMachineRepairs);

router.route('/:id')
  .put(updateMachineRepair)
  .delete(deleteMachineRepair);

export default router;