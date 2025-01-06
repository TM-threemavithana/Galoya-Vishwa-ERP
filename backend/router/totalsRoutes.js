import express from 'express';
import Totals from '../models/totalsSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const totalsData = req.body;
    const newTotals = new Totals(totalsData);
    await newTotals.save();
    res.status(201).json({ message: 'Totals data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving totals data', error });
  }
});

export default router;