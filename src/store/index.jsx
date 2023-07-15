import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersApi } from './apis/userApi';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photoApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [albumsApi.reducerPath]:albumsApi.reducer,
    [photosApi.reducerPath]:photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(usersApi.middleware).concat(albumsApi.middleware).concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} from './apis/userApi';

export {
  useFetchAlbumsQuery,
  useAddAlbumsMutation,
  useRemoveAlbumsMutation
} from "./apis/albumsApi"

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation
} from "./apis/photoApi"
