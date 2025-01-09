import mongoose from 'mongoose';

const rawMaterialsLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  items: [
    {
      item: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
      unitPrice: { type: Number, required: true },
      totalCost: { type: Number, required: true },
      sellerName: { type: String, required: true },
      description: { type: String, required: true }
    }
  ]
});

const RawMaterialsLog = mongoose.model('RawMaterialsLog', rawMaterialsLogSchema);

export default RawMaterialsLog;