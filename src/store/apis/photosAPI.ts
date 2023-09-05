import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from '@faker-js/faker';
import { Photo } from "../../types/types";
import { Album } from "../../types/types";

const pause = (time : number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, time);
    });
};

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            return fetch(...args);
        }
    }),
    tagTypes: ['Photos'],
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (results, error, album : Album) => {
                    return [{type: "Photos", id: album.id}];
                },
                query: (album: Album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET',
                    };
                },
            }),

            // createAlbum: builder.mutation({
            //     invalidatesTags: (result, error, user) => {
            //         return [{type: "Albums", id: user.id}];
            //     },
            //     query: (user: User) => {
            //         return {
            //             url: '/albums',
            //             method: 'POST',
            //             body: {
            //                 userId : user.id,
            //                 title : faker.commerce.productName()
            //             }
            //         };
            //     },
            // }),

            // removeAlbum: builder.mutation({
            //     invalidatesTags: (result,error,album: Album) => {
            //         return [{type: "Albums", id: album.userId}];
            //     },
            //     query: (album: Album) => {
            //         return {
            //             url: '/albums/' + album.id,
            //             method: 'DELETE',
            //         };
            //     },
            // }),

            createPhoto: builder.mutation({
                invalidatesTags: (result, error, album : Album) => {
                    return [{type: "Photos", id: album.id}];
                },
                query: (album: Album) => {
                    return {
                        url: "/photos",
                        method: "POST",
                        body: {
                            albumId : album.id,
                            url: faker.image.url(),
                        }
                    }
                }
            }),

            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo: Photo) => {
                    return [{type: "Photos", id:photo.albumId}];
                },
                query: (photo: Photo) => {
                    return {
                        url: "/photos/" + photo.id,
                        method: "DELETE",
                    }
                }
            })
        };
    }
});

export const {useFetchPhotosQuery, useCreatePhotoMutation, useRemovePhotoMutation} = photosApi;
export {photosApi};