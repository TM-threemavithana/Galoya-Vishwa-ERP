// filepath: /c:/academic/Software Project/backend/models/Machine.js
import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  broughtDate: { type: Date, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Machine = mongoose.model('Machine', machineSchema);

export default Machine;