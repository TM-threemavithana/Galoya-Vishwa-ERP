import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  birthday: { type: Date, required: true },
  position: { type: String, required: true },
  section: { type: String, required: true },
  image: { type: String },
  salary: { type: Number }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;