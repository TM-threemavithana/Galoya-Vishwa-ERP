import mongoose from 'mongoose';

const shopDetailsSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  ownerPhoneNumber: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const ShopDetails = mongoose.model('ShopDetails', shopDetailsSchema);

export default ShopDetails;