import mongoose from 'mongoose';

const sallerySchema = new mongoose.Schema({
  emplName: { type: String },
  salaryPerDay: { type: Number },
  smonthSallery: {type: Number},
  workDays: {type: Number},
  smonth: {type: String},
}, { timestamps: true });

const Sallery = mongoose.model('Sallery', sallerySchema);

export default Sallery;