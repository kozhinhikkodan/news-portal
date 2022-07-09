import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// locationSlice , newsSlice , weatherSlice imported

import locationReducer from '../components/weather/locationSlice';
import newsReducer from '../components/news/newsSlice';
import weatherReducer from '../components/weather/weatherSlice';

// configuring store with location , news , weather reducers

export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    news: newsReducer,
  },
});

// exporting custom dispatch and getState functions

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;