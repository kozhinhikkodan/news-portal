import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { fetchNewsByPopularity, fetchNewsWithQuery } from './newsAPI';

export interface Article {
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
}
export interface NewsState {
    articles: Array<Article>;
    query: string | undefined;
    language: string;
    lastPage: number;
    status: 'loading' | 'loaded' | 'failed';
    error: string | undefined;
}

const initialState: NewsState = {
    articles: [],
    query: undefined,
    language: 'en',
    lastPage: 0,
    status: 'loading',
    error: undefined,
};

interface QueryParameters {
    query: string;
    language: string;
    page: number;
}

interface PopularNewsParameters {
    language: string;
    page: number;
}

// Async thunk for fetching popular news articles to state
export const fetchPopularNews = createAsyncThunk(
    'news/fetchPopularNews',
    async (popularNewsParameters: PopularNewsParameters) => {
        const response = await fetchNewsByPopularity(popularNewsParameters.language, popularNewsParameters.page);
        return response;
    }
);

// Async thunk for fetching queried news articles to state
export const fetchNewsQuery = createAsyncThunk(
    'news/fetchNewsQuery',
    async (queryParameter: QueryParameters) => {
        const response = await fetchNewsWithQuery(queryParameter.query, queryParameter.language, queryParameter.page);
        return response;
    }
);

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        // Empty the articles from state
        clearNews: (state) => {
            state.articles = [];
            state.lastPage = 0;
        },
        // Clear query value
        clearQuery: (state) => {
            state.query = undefined;
        },
        // Set query value in state
        setQueryState: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        // Set language value in state
        setLanguageState: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPopularNews.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.articles = [...state.articles, ...action.payload.data];
                state.lastPage = action.payload.page;
            })
            .addCase(fetchPopularNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchNewsQuery.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsQuery.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.articles = [...state.articles, ...action.payload.data];
                state.lastPage = action.payload.page;
            })
            .addCase(fetchNewsQuery.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { clearNews, setQueryState, clearQuery, setLanguageState } = newsSlice.actions;

export const selectNews = (state: RootState) => state.news;

export const selectPage = (state: RootState) => state.news.lastPage;

export const selectQuery = (state: RootState) => state.news.query;

export const selectLanguage = (state: RootState) => state.news.language;

// Load data from next page using API
export const loadNextPage = (): AppThunk => (
    dispatch,
    getState
) => {
    const currentPage = selectPage(getState());
    const query = selectQuery(getState());
    const language = selectLanguage(getState());
    if (query) {
        dispatch(fetchNewsQuery({ query: query, language: language, page: currentPage + 1 }));
    } else {
        dispatch(fetchPopularNews({ language: language, page: currentPage + 1 }));
    }
};

export default newsSlice.reducer;