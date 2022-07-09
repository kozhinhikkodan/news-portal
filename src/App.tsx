import React from 'react';
import { NewsList } from './components/news/newsList';
import { Weather } from './components/weather/weather';
import { getLocation } from './components/weather/locationSlice';
import { store } from './app/store';
store.dispatch(getLocation());

function App() {
  return (
    <div className="App">
      <Weather />
      <NewsList />
    </div>
  );
}

export default App;