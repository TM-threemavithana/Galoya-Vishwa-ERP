// filepath: /c:/academic/Software Project/backend/models/Machine.js
import mongoose from 'mongoose';

const machineRepairSchema = new mongoose.Schema({
  machine: { type: String, required: true },
  mdescription: { type: String, },
  nextmaintenanceDate:{type:Date , },
  maintenanceCost: { type: Number },
  billNumber: { type: String},
  maintenanceDate: { type: Date },
});

const MachineRepair = mongoose.model('MachineRepair', machineRepairSchema);

export default MachineRepair;