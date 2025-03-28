import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HolidaySuspension from './components/HolidaySuspension';
import Leave from './components/Leave';
import Department from './components/Department';
import DepartmentAssignment from './components/DepartmentAssignment';
import SalaryGrade from './components/SalaryGrade';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HolidaySuspension />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/department" element={<Department />} />
        <Route
          path="/department-assignment"
          element={<DepartmentAssignment />}
        />
        <Route path="/salary-grade" element={<SalaryGrade />} />
      </Routes>
    </Router>
  );
}

export default App;
