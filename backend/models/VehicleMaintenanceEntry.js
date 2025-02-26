import mongoose from 'mongoose';

const vehicleMaintenanceEntrySchema = new mongoose.Schema({
      vehicleV: {type: String, required:true},
      image: {type: String},
      model: {type:String, },
      type: {type:String, },
      serviseDoneBy: {type:String},
      lastMaintenance: {type:Date},
      nextMaintenance: {type:Date},
      mileage: {type:String},
      capacity: {type:String},
      status: { type: String, default: "Active" },
      totalCost: {type:Number},
      partReplace:{type:String},
      repairType:{type:String},
      notes: {type:String},
});

const VehicleMaintenanceEntry = mongoose.model('VehicleMaintenanceEntry', vehicleMaintenanceEntrySchema);

export default VehicleMaintenanceEntry;