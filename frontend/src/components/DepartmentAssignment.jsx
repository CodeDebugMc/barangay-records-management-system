import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Container,
} from '@mui/material';

const DepartmentAssignment = () => {
  const [data, setData] = useState([]);
  const [departmentAssignment, setDepartmentAssignment] = useState({
    department_id: '',
    employeeID: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartmentAssignment();
  }, []);

  const fetchDepartmentAssignment = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/department-assignment'
      );
      setData(response.data);
    } catch (err) {
      console.error('Error fetching leave data', err.message);
    }
  };

  const handleChange = (e) => {
    setDepartmentAssignment({
      ...departmentAssignment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/department-assignment/${editingId}`,
          departmentAssignment
        );
      } else {
        await axios.post(
          'http://localhost:5000/department-assignment',
          departmentAssignment
        );
      }
      setEditingId(null);
      fetchDepartmentAssignment();
      resetForm();
    } catch (error) {
      console.error('Error submitting holiday suspension data', error);
    }
  };

  const handleEdit = (item) => {
    setDepartmentAssignment(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/department-assignment/${id}`);
      fetchDepartmentAssignment();
    } catch (error) {
      console.error('Error deleting leave record', error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setDepartmentAssignment({
      code: '',
      description: '',
    });
  };

  return (
    <Container>
      <h2>Department Records</h2>

      <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3 }}>
        {Object.keys(departmentAssignment).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            name={key}
            value={departmentAssignment[key]}
            onChange={handleChange}
            sx={{ marginRight: 2, marginBottom: 2, width: '23%' }}
          />
        ))}
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ height: 55, marginRight: 2 }}
        >
          {editingId ? 'Update' : 'Add'}
        </Button>
        {editingId && (
          <Button
            onClick={handleCancel}
            variant="contained"
            color="error"
            sx={{ height: 55 }}
          >
            Cancel
          </Button>
        )}
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflow: 'auto' }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Department ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.department_id}</TableCell>
                <TableCell>{item.employeeID}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DepartmentAssignment;
