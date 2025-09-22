import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leave from './components/Leave';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dashboard1 from './components/Dashboard1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<Dashboard1 />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
