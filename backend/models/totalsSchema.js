import mongoose from 'mongoose';

const totalsSchema = new mongoose.Schema({
  productsSaleTotal: { type: Number, required: true },
  returnedItemsTotal: { type: Number, required: true },
  expiredItemsTotal: { type: Number, required: true },
  sampleGivenTotal: { type: Number, required: true },
  totalMoneyValue: { type: Number, required: true },
  totalCreditSales: { type: Number, required: true },
  totalCreditReceives: { type: Number, required: true },
  leakage: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Totals = mongoose.model('Totals', totalsSchema);

export default Totals;