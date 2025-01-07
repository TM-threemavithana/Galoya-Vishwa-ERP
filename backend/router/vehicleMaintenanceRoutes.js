import express from 'express';
import { addVehicleMaintenanceEntry, getVehicleMaintenanceEntries } from '../controllers/vehicleMaintenanceController.js';

const router = express.Router();

router.route('/').post(addVehicleMaintenanceEntry).get(getVehicleMaintenanceEntries);

export default router;