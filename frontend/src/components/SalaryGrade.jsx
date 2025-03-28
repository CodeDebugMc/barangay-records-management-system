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

const SalaryGrade = () => {
  const [data, setData] = useState([]);
  const [SalaryGrade, setSalaryGrade] = useState({
    effectivityDate: '',
    sg_number: '',
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: '',
    step6: '',
    step7: '',
    step8: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSalaryGrade();
  }, []);

  const fetchSalaryGrade = async () => {
    try {
      const response = await axios.get('http://localhost:5000/salary-grade');
      setData(response.data);
    } catch (err) {
      console.error('Error fetching leave data', err.message);
    }
  };

  const handleChange = (e) => {
    setSalaryGrade({
      ...SalaryGrade,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/salary-grade/${editingId}`,
          SalaryGrade
        );
      } else {
        await axios.post('http://localhost:5000/salary-grade', SalaryGrade);
      }
      setEditingId(null);
      fetchSalaryGrade();
      resetForm();
    } catch (error) {
      console.error('Error submitting holiday suspension data', error);
    }
  };

  const handleEdit = (item) => {
    setSalaryGrade(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/salary-grade/${id}`);
      fetchSalaryGrade();
    } catch (error) {
      console.error('Error deleting leave record', error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setSalaryGrade({
      effectivityDate: '',
      sg_number: '',
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
    });
  };

  return (
    <Container>
      <h2>Salary Grade Records</h2>

      <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3 }}>
        {Object.keys(SalaryGrade).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            name={key}
            value={SalaryGrade[key]}
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
              <TableCell>Effectivity Date</TableCell>
              <TableCell>Salary Grade Number</TableCell>
              <TableCell>Step 1</TableCell>
              <TableCell>Step 2</TableCell>
              <TableCell>Step 3</TableCell>
              <TableCell>Step 4</TableCell>
              <TableCell>Step 5</TableCell>
              <TableCell>Step 6</TableCell>
              <TableCell>Step 7</TableCell>
              <TableCell>Step 8</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.effectivityDate}</TableCell>
                <TableCell>{item.sg_number}</TableCell>
                <TableCell>{item.step1}</TableCell>
                <TableCell>{item.step2}</TableCell>
                <TableCell>{item.step3}</TableCell>
                <TableCell>{item.step4}</TableCell>
                <TableCell>{item.step5}</TableCell>
                <TableCell>{item.step6}</TableCell>
                <TableCell>{item.step7}</TableCell>
                <TableCell>{item.step8}</TableCell>

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

export default SalaryGrade;
