import mongoose from 'mongoose';

const sallerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNumber:{type:String, required:true, unique: true},
  position: { type: String, required: true },
  section: { type: String, required: true },
  salaryPerDay: { type: Number },
  monthSallery: {type: Number},
  workDays: {type: Number},
  month: {type: String},
}, { timestamps: true });

const Sallery = mongoose.model('Sallery', sallerySchema);

export default Sallery;