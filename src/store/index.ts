import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosAPI";

const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    }
});

export {store};
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export * from './apis/albumsApi';
export * from './apis/photosAPI';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;