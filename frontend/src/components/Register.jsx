import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Container } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        alert('Username and password are required');
        console.log('Username and password are required');
        return;
      }

      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      });

      navigate('/');
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering user', error);
      alert(error.response.data.error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
      </Box>
    </Container>
  );
};

export default Register;
