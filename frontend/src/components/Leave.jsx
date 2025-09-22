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

const Leave = () => {
  const [data, setData] = useState([]);
  const [leave, setLeave] = useState({
    leave_code: '',
    description: '',
    number_hours: '',
    status: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLeave();
  }, []);

  const fetchLeave = async () => {
    try {
      const response = await axios.get('http://localhost:3000/leave');
      setData(response.data);
    } catch (err) {
      console.error('Error fetching leave data', err.message);
    }
  };

  const handleChange = (e) => {
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/leave/${editingId}`, leave);
      } else {
        await axios.post('http://localhost:3000/leave', leave);
      }
      setEditingId(null);
      fetchLeave();
      resetForm();
    } catch (error) {
      console.error('Error submitting holiday suspension data', error);
    }
  };

  const handleEdit = (item) => {
    setLeave({
      leave_code: item.leave_code,
      description: item.description,
      number_hours: item.number_hours,
      status: item.status,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/leave/${id}`);
      fetchLeave();
    } catch (error) {
      console.error('Error deleting leave record', error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setLeave({
      leave_code: '',
      description: '',
      number_hours: '',
      status: '',
    });
  };

  return (
    <Container>
      <h2>Holiday and Suspension Records</h2>

      <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3 }}>
        {Object.keys(leave).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            name={key}
            value={leave[key]}
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
              <TableCell>Leave Code</TableCell>
              <TableCell>Descriptions</TableCell>
              <TableCell>Number of Hours</TableCell>
              <TableCell>Status</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.leave_code}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.number_hours}</TableCell>
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

export default Leave;
