// filepath: /c:/academic/Software Project/backend/router/machineRoutes.js
import express from 'express';
import {
  addMachine,
  getMachines,
  updateMachine,
  deleteMachine,
} from '../controllers/machineController.js';

const router = express.Router();

router.route('/')
  .post(addMachine)
  .get(getMachines);

router.route('/:id')
  .put(updateMachine)
  .delete(deleteMachine);

export default router;