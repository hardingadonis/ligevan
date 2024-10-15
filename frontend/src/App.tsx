import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
