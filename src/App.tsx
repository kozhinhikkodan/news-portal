import React from 'react';
import { NewsList } from './components/news/newsList';
import { Weather } from './components/weather/weather';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getLocation } from './components/weather/locationSlice';
import { store } from './app/store';
store.dispatch(getLocation());

function App() {

  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path="/" element={<NewsList />} />
        </Routes>
      </Router> */}
      <Weather />
      <NewsList />
    </div>
  );
}

export default App;