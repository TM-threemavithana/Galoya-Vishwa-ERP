import { jest } from '@jest/globals';

// Global mocks and utilities
export const mockRequest = (body = {}, params = {}, query = {}, cookies = {}) => ({
  body,
  params,
  query,
  cookies
});

export const mockResponse = () => {
  const res = {};
  // Make sure these are properly spied on
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.cookie = jest.fn(() => res);
  
  // Log the mock function to verify it works
  console.log('Mock status function:', res.status);
  
  return res;
};

export const mockNext = jest.fn();