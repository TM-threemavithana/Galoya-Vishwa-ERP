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

router.get('/', async (req, res) => {
  try {
    const totals = await Totals.find().sort({ createdAt: -1 }); // Fetch all totals sorted by creation date
    res.status(200).json(totals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching totals data', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Totals.findByIdAndDelete(id);
    res.status(200).json({ message: 'Totals data deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting totals data', error });
  }
});

export default router;