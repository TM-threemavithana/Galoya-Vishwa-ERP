import Inventory from '../../models/Inventory.js';
import * as controller from '../../controllers/inventoryController.js';
import { connectDB, disconnectDB, clearDB } from '../utils/dbHandler.js';
import { jest } from '@jest/globals';
import { mockRequest, mockResponse, mockNext } from '../setup.js';

// Mock the catchAsyncErrors middleware
jest.mock('../../middlewares/catchAsyncErrors.js', () => ({
  catchAsyncErrors: (fn) => fn
}));

// Directly accessing the raw controller functions
const { addInventory, getInventories } = controller;

// Setup database connections
beforeAll(async () => await connectDB());
afterEach(async () => {
  await clearDB();
  jest.clearAllMocks();
});
afterAll(async () => await disconnectDB());

describe('Inventory Controller', () => {
  describe('addInventory', () => {
    it('should return error when required fields are missing', async () => {
      const req = mockRequest({
        // Missing fields
        inventoryName: 'Test Product'
      });
      
      const res = mockResponse();
      
      await addInventory(req, res, mockNext);
      
      // Verify error handler was called
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext.mock.calls[0][0].message).toContain('Please fill in all fields');
      expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
    });
  });
  
  describe('getInventories', () => {
    // No tests for getInventories
  });
});