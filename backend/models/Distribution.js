import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  inventoryName: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const distributionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  vehicleNumber: { type: String, required: true },
  route: { type: String, required: true },
  refName: { type: String, required: true },
  driverName: { type: String, required: true },
  inventories: [inventorySchema]
});

const Distribution = mongoose.model('Distribution', distributionSchema);

export default Distribution;