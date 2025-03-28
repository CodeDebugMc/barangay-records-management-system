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

const HolidaySuspension = () => {
  const [data, setData] = useState([]);
  const [holidayAndSuspension, setHolidayAndSuspension] = useState({
    description: '',
    date: '',
    status: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHolidayAndSuspension();
  }, []);

  const fetchHolidayAndSuspension = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/holiday-suspension'
      );
      setData(response.data);
    } catch (err) {
      console.error('Error fetching holiday suspension data', err.message);
    }
  };

  const handleChange = (e) => {
    setHolidayAndSuspension({
      ...holidayAndSuspension,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/holiday-suspension/${editingId}`,
          holidayAndSuspension
        );
      } else {
        await axios.post(
          'http://localhost:5000/holiday-suspension',
          holidayAndSuspension
        );
      }
      setEditingId(null);
      fetchHolidayAndSuspension();
      resetForm();
    } catch (error) {
      console.error('Error submitting holiday suspension data', error);
    }
  };

  const handleEdit = (item) => {
    setHolidayAndSuspension(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/holiday-suspension/${id}`);
      fetchHolidayAndSuspension();
    } catch (error) {
      console.error('Error deleting holiday suspension record', error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setHolidayAndSuspension({
      description: '',
      date: '',
      status: '',
    });
  };

  return (
    <Container>
      <h2>Holiday and Suspension Records</h2>

      <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3 }}>
        {Object.keys(holidayAndSuspension).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            name={key}
            value={holidayAndSuspension[key]}
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
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.status}</TableCell>
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

export default HolidaySuspension;
