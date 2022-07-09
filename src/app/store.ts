import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer from '../components/weather/locationSlice';
import newsReducer from '../components/news/newsSlice';
import weatherReducer from '../components/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    news: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;