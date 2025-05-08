// filepath: /c:/academic/Software Project/backend/models/Machine.js
import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  placeNum:{type:Number},
  broughtDate: { type: Date,  },
  price: { type: Number,  },
  description: { type: String, },
  image: {type:String, },
  nextRepairDate:{type:Date , },
  cost: { type: Number },
  billNo: { type: String},
  repairDate: { type: Date },
});

const Machine = mongoose.model('Machine', machineSchema);

export default Machine;