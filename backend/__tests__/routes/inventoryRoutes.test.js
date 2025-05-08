import request from 'supertest';
import express from 'express';
import Inventory from '../../models/Inventory.js';
import { connectDB, disconnectDB, clearDB } from '../utils/dbHandler.js';
import { jest } from '@jest/globals';

// Import the inventory controller functions directly for the test
import { addInventory, getInventories } from '../../controllers/inventoryController.js';
import { catchAsyncErrors } from '../../middlewares/catchAsyncErrors.js';

// Create test app that properly mimics your production app setup
const app = express();
app.use(express.json());

// Setup routes correctly
app.post('/api/inventories', catchAsyncErrors(addInventory));
app.get('/api/inventories', catchAsyncErrors(getInventories));

// Error handling middleware to properly convert errors to JSON responses
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Setup database connections
beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await disconnectDB());

describe('Inventory API Routes', () => {
  it('should create a new inventory via POST /api/inventories', async () => {
    const inventoryData = {
      date: new Date().toISOString(),
      inventoryName: 'Test API Product',
      quantity: 150,
      expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      batchNo: 'APIBATCH001',
      labourName: 'API Test Worker'
    };

    const response = await request(app)
      .post('/api/inventories')
      .send(inventoryData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.inventory).toMatchObject({
      inventoryName: 'Test API Product',
      quantity: 150,
      batchNo: 'APIBATCH001'
    });
  });

  it('should get all inventories via GET /api/inventories', async () => {
    // Add some test inventory items
    await Inventory.create([
      {
        date: new Date(),
        inventoryName: 'API Test Product 1',
        quantity: 100,
        expiredDate: new Date(),
        batchNo: 'APIBATCH111',
        labourName: 'API Test Worker'
      },
      {
        date: new Date(),
        inventoryName: 'API Test Product 2',
        quantity: 200,
        expiredDate: new Date(),
        batchNo: 'APIBATCH222',
        labourName: 'Another API Worker'
      }
    ]);

    const response = await request(app)
      .get('/api/inventories')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.inventories).toHaveLength(2);
    expect(response.body.inventories[0]).toHaveProperty('inventoryName');
    expect(response.body.inventories[1]).toHaveProperty('inventoryName');
  });
});