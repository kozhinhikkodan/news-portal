import React from 'react';
import { NewsList } from './components/news/newsList';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NewsList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;