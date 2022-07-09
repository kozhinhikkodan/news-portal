import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LocationInfo } from './locationSlice';
import { fetchWeather } from './weatherAPI';

export type WeatherInfo = {
    main: string;
    icon: string;
    place: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}
export interface WeatherState {
    weatherInfo: WeatherInfo | undefined;
    status: 'loading' | 'loaded' | 'failed';
    error: string | undefined;
}

const initialState: WeatherState = {
    weatherInfo: undefined,
    status: 'loading',
    error: undefined,
};

// Aync thunk which retrieves weather data from weather api
export const getWeather = createAsyncThunk(
    'weather/getWeather',
    async (location: LocationInfo) => {
        const response = await fetchWeather(location);
        return response.data;
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.weatherInfo = action.payload;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;