import ReturnedItems from '../models/returnedItemsSchema.js';

// Controller to handle the creation of returned items
export const createReturnedItem = async (req, res) => {
  try {
    const { productName, quantity, price, value } = req.body;

    // Create a new ReturnedItems document
    const newReturnedItem = new ReturnedItems({
      productName,
      quantity,
      price,
      value,
    });

    // Save the document to the database
    await newReturnedItem.save();

    // Send a success response
    res.status(201).json({ message: 'Returned item saved successfully!' });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: 'Error saving returned item', error });
  }
};
