import express from 'express';
import { connectDB, disconnectDB, clearDB } from './dbHandler.js';

/**
 * Create a test Express app with the given routes
 * @param {Object} routes - Express router object
 * @returns {Object} Express app configured for testing
 */
export const createTestApp = (routes) => {
  const app = express();
  app.use(express.json());
  app.use('/api', routes);

  // Error handling middleware for testing
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
    });
  });

  return app;
};

/**
 * Setup functions for testing
 */
export const setupTestDB = () => {
  beforeAll(async () => await connectDB());
  afterEach(async () => await clearDB());
  afterAll(async () => await disconnectDB());
};

/**
 * Mock request and response objects for controller testing
 */
export const mockRequest = (body = {}, params = {}, query = {}, user = null) => ({
  body,
  params,
  query,
  user,
  cookies: {}
});

export const mockResponse = () => {
  const res = {};
  res.status = function(statusCode) {
    this.statusCode = statusCode;
    return this;
  };
  res.json = function(data) {
    this.body = data;
    return this;
  };
  res.cookie = function(name, value, options) {
    this.cookies = this.cookies || {};
    this.cookies[name] = {value, options};
    return this;
  };
  // Convert each of these to a spy function so they can be tested with expect().toHaveBeenCalled()
  jest.spyOn(res, 'status');
  jest.spyOn(res, 'json');
  jest.spyOn(res, 'cookie');
  return res;
};

export const mockNext = function(err) {
  this.err = err;
};
jest.spyOn(mockNext, 'call');