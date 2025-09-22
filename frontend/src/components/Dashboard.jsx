import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const storedUser = localStorage.getItem('username') || '';
    const storedRole = localStorage.getItem('role') || '';

    setUser(storedUser);
    setRole(storedRole);

    if (storedRole !== 'superadmin' && storedRole !== 'admin') {
      navigate('/user');
    } else {
      navigate('/dashboard');
    }
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

export default Dashboard;
