import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlgebraicStructuresApp from './AlgebraicStructuresApp';
import NotFound from './NotFound';

function App() {
  return (
    <Router basename="/10-papers">
      <div className="App">
        <Routes>
          <Route path="/" element={<AlgebraicStructuresApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
