import express from 'express';
import {
  addVehicleRepair,
  getVehicleRepairs,
  updateVehicleRepair,
  deleteVehicleRepair,
} from '../controllers/vehicleMaintenanceController.js';

const router = express.Router();

// Route for adding and fetching vehicle repairs
router.route('/')
  .post(addVehicleRepair)    // POST to add a new vehicle repair
  .get(getVehicleRepairs);   // GET to fetch all vehicle repairs

// Route for updating and deleting vehicle repairs by vehicle ID
router.route('/:id')
  .put(updateVehicleRepair)  // PUT to update a vehicle repair by ID
  .delete(deleteVehicleRepair); // DELETE to remove a vehicle repair by ID

export default router;
