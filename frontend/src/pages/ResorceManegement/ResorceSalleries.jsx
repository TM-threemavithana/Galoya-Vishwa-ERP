import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Box,
  Typography
} from "@mui/material";

const ResourceSallery = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [salaryPerDay, setSalaryPerDay] = useState(0);
  const [workDays, setWorkDays] = useState("");
  const [otHours, setOtHours] = useState("");
  const [absenceDays, setAbsenceDays] = useState("");
  const [deductions, setDeductions] = useState("");
  const [allowances, setAllowances] = useState("");
  const [totalSalary, setTotalSalary] = useState(null);
  const [confirmStep, setConfirmStep] = useState(false);
  const [confirmWorkDays, setConfirmWorkDays] = useState("");
  const [confirmOtHours, setConfirmOtHours] = useState("");
  const [confirmAbsenceDays, setConfirmAbsenceDays] = useState("");
  const [confirmDeductions, setConfirmDeductions] = useState("");
  const [confirmAllowances, setConfirmAllowances] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://galoya-vishwa-erp-backend.onrender.com/api/employee")
      .then(response => {
        if (response.data.success && Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);

    if (employeeId) {
      const selectedEmp = employees.find(emp => emp._id === employeeId);
      setSalaryPerDay(selectedEmp?.salary || 0);
    }
  };

  const calculateSalary = () => {
    const otPayPerHour = salaryPerDay * 0.1;
    const bonus = absenceDays === "0" ? 5000 : 0;

    const workPay = Number(workDays) * salaryPerDay;
    const otPay = Number(otHours) * otPayPerHour;
    const deductionAmount = deductions ? parseFloat(deductions) : 0;
    const allowancesAmount = allowances ? parseFloat(allowances) : 0;

    const finalSalary = workPay + otPay - deductionAmount + bonus + allowancesAmount;
    setTotalSalary(finalSalary);
    setConfirmStep(true);
  };

  const saveSalary = async () => {
    if (!confirmStep) {
      toast.info("Please re-enter the details for verification.");
      setConfirmStep(true);
      return;
    }

    const confirmWorkDaysNum = Number(confirmWorkDays);
    const confirmOtHoursNum = Number(confirmOtHours);
    const confirmAbsenceDaysNum = Number(confirmAbsenceDays);
    const confirmDeductionsNum = Number(confirmDeductions);
    const confirmAllowancesNum = Number(confirmAllowances);

    if (
      Number(workDays) !== confirmWorkDaysNum ||
      Number(otHours) !== confirmOtHoursNum ||
      Number(absenceDays) !== confirmAbsenceDaysNum ||
      Number(deductions) !== confirmDeductionsNum ||
      Number(allowances) !== confirmAllowancesNum
    ) {
      toast.error("Details do not match! Please try again.");
      return;
    }

    const selectedEmp = employees.find(emp => emp._id === selectedEmployee);
    const employeeName = selectedEmp ? selectedEmp.name : "Unknown";

    const salaryData = {
      employeeId: selectedEmployee,
      name: employeeName,
      workingDays: Number(workDays),
      monthSallery: totalSalary,
      month: selectedMonth,
    };

    try {
      const response = await axios.put(
        `https://galoya-vishwa-erp-backend.onrender.com/api/employee/${selectedEmployee}`,
        salaryData
      );
      if (response.data.success) {
        toast.success("Salary saved successfully!");
        setConfirmStep(false);
      } else {
        toast.error("Failed to save salary.");
      }
    } catch (error) {
      console.error("Error saving salary:", error.response?.data || error);
      toast.error(`Error saving salary: ${error.response?.data?.message || error.message}`);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const id = `GV0${emp.emplId}`.toLowerCase();
    return (
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      id.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: 3 }}>
        <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', width: '100%' }}>
          <Link to="/salaries/edit" style={{ textDecoration: 'none', width: '30%' }}>
            <Button variant="contained" color="primary" fullWidth sx={{ height: '50px' }}>Edit</Button>
          </Link>
          <Link to="/resource-sallery" style={{ textDecoration: 'none', width: '30%' }}>
            <Button variant="contained" color="secondary" fullWidth sx={{ height: '50px' }}>Calculate</Button>
          </Link>
          <Link to="/salary-details" style={{ textDecoration: 'none', width: '30%' }}>
            <Button variant="contained" color="success" fullWidth sx={{ height: '50px' }}>Details</Button>
          </Link>
        </nav>

        <Typography variant="h4" gutterBottom>Salary Calculator</Typography>

        <TextField
          label="Search Employee (Name or ID)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Employee</InputLabel>
          <Select
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            label="Select Employee"
          >
            <MenuItem value="">Select Employee</MenuItem>
            {filteredEmployees.map((employee) => (
              <MenuItem key={employee._id} value={employee._id}>
                {employee.name} (GV0{employee.emplId})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Salary per Day (LKR)"
          value={salaryPerDay}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />

        <TextField
          label="Select Month"
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Numeric fields with positive-only validation */}
        <TextField
          label="Work Days"
          type="number"
          value={workDays}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) >= 0) setWorkDays(value);
          }}
          fullWidth
          margin="normal"
        />

        <TextField
          label="OT Hours"
          type="number"
          value={otHours}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) >= 0) setOtHours(value);
          }}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Absence Days"
          type="number"
          value={absenceDays}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) >= 0) setAbsenceDays(value);
          }}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Deductions (LKR)"
          type="number"
          value={deductions}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) >= 0) setDeductions(value);
          }}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Allowances (LKR)"
          type="number"
          value={allowances}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) >= 0) setAllowances(value);
          }}
          fullWidth
          margin="normal"
        />

        <Button
          onClick={calculateSalary}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          Calculate Salary
        </Button>

        {totalSalary !== null && (
          <Box sx={{ marginTop: "20px", padding: "10px", backgroundColor: "#e8f5e9", borderRadius: "5px" }}>
            <Typography variant="h6" color="success.main">Total Salary: LKR. {totalSalary}</Typography>
          </Box>
        )}

        {confirmStep && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h6" gutterBottom>Re-enter Details for Verification</Typography>

            {/* Confirm fields with validation */}
            <TextField label="Re-enter Work Days" type="number" value={confirmWorkDays} onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 0) setConfirmWorkDays(value);
            }} fullWidth margin="normal" />

            <TextField label="Re-enter OT Hours" type="number" value={confirmOtHours} onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 0) setConfirmOtHours(value);
            }} fullWidth margin="normal" />

            <TextField label="Re-enter Absence Days" type="number" value={confirmAbsenceDays} onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 0) setConfirmAbsenceDays(value);
            }} fullWidth margin="normal" />

            <TextField label="Re-enter Deductions" type="number" value={confirmDeductions} onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 0) setConfirmDeductions(value);
            }} fullWidth margin="normal" />

            <TextField label="Re-enter Allowances" type="number" value={confirmAllowances} onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 0) setConfirmAllowances(value);
            }} fullWidth margin="normal" />
          </Box>
        )}

        <Button
          onClick={saveSalary}
          variant="contained"
          color="success"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          {confirmStep ? "Confirm and Save Salary" : "Save Total Salary"}
        </Button>

        <ToastContainer />
      </Box>
    </Container>
  );
};

export default ResourceSallery; 