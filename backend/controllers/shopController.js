import ShopDetails from '../models/shopDetailsSchema.js';

// Controller to handle the creation of shop details
export const createShopDetails = async (req, res) => {
  try {
    const { shopName, route, ownerPhoneNumber, ownerName, address } = req.body;

    // Create a new ShopDetails document
    const newShopDetails = new ShopDetails({
      shopName,
      route,
      ownerPhoneNumber,
      ownerName,
      address,
    });

    // Save the document to the database
    await newShopDetails.save();

    // Send a success response
    res.status(201).json({ message: 'Shop details saved successfully!', data: newShopDetails });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: 'Error saving shop details', error });
  }
};

// Controller to handle fetching all shop details
export const getShopDetails = async (req, res) => {
  try {
    const shopDetails = await ShopDetails.find();
    res.status(200).json(shopDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop details', error });
  }
};