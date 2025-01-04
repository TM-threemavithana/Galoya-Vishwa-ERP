import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  seller: { type: String, required: true },
  description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;