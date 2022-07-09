import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// get user location

export type LocationInfo = {
    latitude: number | undefined;
    longitude: number | undefined;
}
export interface LocationState {
    locationInfo: LocationInfo | undefined;
    status: 'loading' | 'loaded' | 'failed';
    error: string | undefined;
}

const initialState: LocationState = {
    locationInfo: undefined,
    status: 'loading',
    error: undefined,
};

// Asks for location permission and retrieve location data if allowed
export const getLocation = createAsyncThunk(
    'location/getLocation',
    async () => {
        return new Promise<{ location: LocationInfo}>((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Not Supported'));
            }
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({location: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
            }, () => {
                reject(new Error('Location Permission denied'));
            })
        }
        );
    }
);

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLocation.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.locationInfo = action.payload.location;
            })
            .addCase(getLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;