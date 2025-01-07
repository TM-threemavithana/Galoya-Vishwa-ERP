import mongoose from 'mongoose';

const vehicleMaintenanceEntrySchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  serviceDoneBy: { type: String, required: true },
  serviceType: { type: String, required: true },
  mileage: { type: Number, required: true },
  partsReplaced: { type: String, required: true },
  totalCost: { type: Number, required: true },
  notes: { type: String, required: true }
});

const VehicleMaintenanceEntry = mongoose.model('VehicleMaintenanceEntry', vehicleMaintenanceEntrySchema);

export default VehicleMaintenanceEntry;