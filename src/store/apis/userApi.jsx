import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {faker} from "@faker-js/faker"

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: ' http://localhost:3000',
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        //eklediklerimizi direkt görüntüleyebilmek için
        providesTags:["User"],
        query: () => {
          return {
            url: '/users',
            method: 'GET',
          };
        },
      }),
      addUser: builder.mutation({
        invalidatesTags:()=>{
          //data eklediğimizde eklenmesine rağmen direkt göstermez bunu düzeltmek için yukarıda tanımladığımızı iptal ediğ günceli getirir
          return[{type:"User"}]
        },
        query: () => {
          return {
            url: '/users',
            method: 'POST',
            body: {
              //random bir şekilde isim ataması yapar
              name: faker.name.fullName(),
            },
          };
        },
      }),
      removeUser: builder.mutation({
        invalidatesTags:()=>{
          //data silindiğinde direkt göstermez bunu düzeltmek için yukarıda tanımladığımızı iptal edip günceli getirir
          return[{type:"User"}]
        },
        query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
  usersApi;
export { usersApi };
