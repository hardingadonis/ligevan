import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomepageStudent from '@/pages/student/Homepage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/student" element={<HomepageStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
