import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const ShowSalaryDetails = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee/salary");
        setSalaries(response.data.salaries || []);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      }
    };

    fetchSalaries();
  }, []);

  // Filter records where all fields are filled
  const completeSalaries = salaries.filter(
    (salary) =>
      salary.emplName &&
      salary.smonth &&
      salary.workDays &&
      salary.smonthSallery
  );

  // Keep only one salary entry per employee per month
  const uniqueSalariesMap = new Map();
  completeSalaries.forEach((salary) => {
    const key = `${salary.emplName}-${salary.smonth}`;
    if (!uniqueSalariesMap.has(key)) {
      uniqueSalariesMap.set(key, salary);
    }
  });

  const uniqueSalaries = Array.from(uniqueSalariesMap.values());

  // Filter by search query
  const filteredSalaries = uniqueSalaries.filter((salary) =>
    salary.emplName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box my={4} p={4} component={Paper} elevation={5} sx={{ borderRadius: 3 }}>

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/salaries/edit"
            sx={{ width: "30%", height: 50, fontSize: "16px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/resource-sallery"
            sx={{ width: "30%", height: 50, fontSize: "16px" }}
          >
            Calculate
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/salary-details"
            sx={{ width: "30%", height: 50, fontSize: "16px" }}
          >
            Details
          </Button>
        </Box>

        <Typography variant="h4" color="primary" align="center" fontWeight="bold" gutterBottom>
          Salary Details
        </Typography>

        {/* Search Field */}
        <TextField
          fullWidth
          variant="outlined"
          label="Search by Employee Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          margin="normal"
          sx={{ mb: 3 }}
        />

        {/* Salary Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Employee</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Month</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Work Days</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Monthly Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSalaries.length > 0 ? (
                filteredSalaries.map((salary, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{salary.emplName}</TableCell>
                    <TableCell>{salary.smonth}</TableCell>
                    <TableCell>{salary.workDays}</TableCell>
                    <TableCell>${salary.smonthSallery}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No salary records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ShowSalaryDetails;