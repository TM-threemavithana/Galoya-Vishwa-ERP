import express from 'express';
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getSalary,
} from '../controllers/employeeController.js';

const router = express.Router();

router.route('/')
  .post(addEmployee)
  .get(getEmployees);

router.route('/:id')
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route('/salary')
  .get(getSalary);

export default router;
