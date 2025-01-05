import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  inventoryName: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiredDate: { type: Date, required: true },
  batchNo: { type: String, required: true },
  labourName: { type: String, required: true }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;