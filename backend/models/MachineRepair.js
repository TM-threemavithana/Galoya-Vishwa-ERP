// filepath: /c:/academic/Software Project/backend/models/MachineRepair.js
import mongoose from 'mongoose';

const machineRepairSchema = new mongoose.Schema({
  machineName: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  billNo: { type: String, required: true },
  repairDate: { type: Date, required: true },
  nextRepairDate: { type: Date, required: true },
});

const MachineRepair = mongoose.model('MachineRepair', machineRepairSchema);

export default MachineRepair;