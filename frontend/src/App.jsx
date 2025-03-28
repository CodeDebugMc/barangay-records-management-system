import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HolidaySuspension from './components/HolidaySuspension';
import Leave from './components/Leave';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HolidaySuspension />} />
        <Route path="/leave" element={<Leave />} />
      </Routes>
    </Router>
  );
}

export default App;
