import { connectDB, disconnectDB, clearDB } from '../utils/db.js';
import VehicleRepair from '../../models/VehicleMaintenanceEntry.js';
import Maintenance from '../../models/Maintenance.js';
import request from 'supertest';
import express from 'express';
import { updateVehicleRepair, getVehicleRepairs, getMaintenance } from '../../controllers/vehicleMaintenanceController.js';
import { catchAsyncErrors } from '../../middlewares/catchAsyncErrors.js';

const app = express();
app.use(express.json());

// Set up routes for testing
app.put('/api/vehicle-maintenance/:id', catchAsyncErrors(updateVehicleRepair));
app.get('/api/vehicle-maintenance', catchAsyncErrors(getVehicleRepairs));
app.get('/api/maintenance', catchAsyncErrors(getMaintenance));

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await disconnectDB());

describe('Vehicle Maintenance Controller Tests', () => {
  
  test('should get all vehicle repairs', async () => {
    // Add test data
    await VehicleRepair.create([
      {
        vehicleV: 'Test Vehicle 1',
        model: 'Model X',
        repairType: 'Oil Change',
        mileage: '10000',
        partReplace: 'Oil Filter',
        serviseDoneBy: 'Test Service',
        lastMaintenance: new Date(),
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        totalCost: 5000,
        status: 'Active'
      },
      {
        vehicleV: 'Test Vehicle 2',
        model: 'Model Y',
        repairType: 'Brake Replacement',
        mileage: '20000',
        partReplace: 'Brake Pads',
        serviseDoneBy: 'Another Service',
        lastMaintenance: new Date(),
        nextMaintenance: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        totalCost: 8000,
        status: 'Active'
      }
    ]);

    const response = await request(app)
      .get('/api/vehicle-maintenance')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.vehicleRepairs)).toBe(true);
    expect(response.body.vehicleRepairs.length).toBe(2);
  });

  test('should update vehicle repair and create maintenance record', async () => {
    // First create a vehicle repair
    const vehicleRepair = await VehicleRepair.create({
      vehicleV: 'Test Vehicle',
      model: 'Model Z',
      repairType: 'Initial Service',
      mileage: '5000',
      partReplace: 'None',
      serviseDoneBy: 'Test Service',
      lastMaintenance: new Date(),
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      totalCost: 2000,
      status: 'Active'
    });

    const updateData = {
      vehicleV: 'Test Vehicle Updated',
      repairType: 'Major Service',
      mileage: '15000',
      partReplace: 'Multiple Parts',
      serviseDoneBy: 'Premium Service',
      totalCost: 12000,
      lastMaintenance: new Date(),
      nextMaintenance: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      notes: 'Complete overhaul'
    };

    const response = await request(app)
      .put(`/api/vehicle-maintenance/${vehicleRepair._id}`)
      .send(updateData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.vehicleRepair.vehicleV).toBe(updateData.vehicleV);
    expect(response.body.vehicleRepair.repairType).toBe(updateData.repairType);
    expect(response.body.maintenance).toBeDefined();
  });
});