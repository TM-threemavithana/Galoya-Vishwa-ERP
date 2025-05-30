import express from 'express';
import {
  addVehicles,
  getVehicles,
  updateVehicles,
  deleteVehicles,
  getMaintenance,
} from '../controllers/vehicleController.js';

const router = express.Router();

router.route('/')
  .post(addVehicles)
  .get(getVehicles);

router.route('/:id')
  .put(updateVehicles)
  .delete(deleteVehicles)
  .get(updateVehicles);

router.route('/maintenance')
  .get(getMaintenance);

export default router;