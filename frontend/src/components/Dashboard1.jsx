import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const Dashboard1 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    setUser(localStorage.getItem('username') || '');
    setRole(localStorage.getItem('role') || '');

    // if (role !== 'superadmin' || role !== 'admin') {
    //   navigate('/user');
    // }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Welcome {user} </Typography>
      <Typography variant="subtitle1">Role: {role}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </Button>
    </Container>
  );
};

export default Dashboard1;
