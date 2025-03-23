import mongoose from 'mongoose';

const MaintenanceSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  type: { type: String, },
  model: {type:String, },
  nextRepairDate:{type:Date , },
  cost: { type: Number },
  lastRepairDate: { type: Date },
});

const Maintenance = mongoose.model('Maintenance',MaintenanceSchema);

export default Maintenance;