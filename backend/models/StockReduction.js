import mongoose from 'mongoose';

const stockReductionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  inventoryName: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const StockReduction = mongoose.model('StockReduction', stockReductionSchema);

export default StockReduction;