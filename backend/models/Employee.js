import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emplId: {type:Number},
  idNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^(?:\d{11}V|\d{12})$/, 'Invalid ID number format. Must be 11 digits followed by "V" or 12 digits.']
  },
  birthday: { type: Date, required: true },
  position: { type: String, required: true },
  section: { type: String, required: true },
  image: { type: String },
  salary: { type: Number },
  monthSallery: {type: Number},
  month:{type: String},
  workingDays:{type:Number},
  joinedDate: {type:Date},
  contactNumber1: {
    type: String,
    match: [/^(\+94|0)[0-9]{9}$/, "Please enter a valid Sri Lankan mobile number"], // Regex for valid mobile numbers in Sri Lanka
  },
  contactNumber2: {
    type: String,
    match: [/^(\+94|0)[0-9]{9}$/, "Please enter a valid Sri Lankan mobile number"], // Optional secondary contact number
  },
  residence: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;