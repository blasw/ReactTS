import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Album, User} from '../../types/types';
import { faker } from '@faker-js/faker';

const pause = (time: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve,time);
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            return fetch(...args);
        }
    }),
    tagTypes: ['Albums'],
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                providesTags: (results, error, user) => {
                    return [{type: "Albums", id: user.id}];
                },
                query: (user: User) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET',
                    };
                },
            }),

            createAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{type: "Albums", id: user.id}];
                },
                query: (user: User) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId : user.id,
                            title : faker.commerce.productName()
                        }
                    };
                },
            }),

            removeAlbum: builder.mutation({
                invalidatesTags: (result,error,album: Album) => {
                    return [{type: "Albums", id: album.userId}];
                },
                query: (album: Album) => {
                    return {
                        url: '/albums/' + album.id,
                        method: 'DELETE',
                    };
                },
            }),
        };
    }
});

export const { useFetchAlbumsQuery, useCreateAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export {albumsApi};