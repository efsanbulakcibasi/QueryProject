import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags:(result,error,album)=>{
            const tags = result.map((album) => {
                return {type:"Album",id:album.id};
            });
            tags.push({type:"UsersAlbum",id:album.id});
            return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "GET",
            //hangi kişiye ait albümle ilgili olduğunu anlamamız için id'sine ihtiyaç duyarız
            //bu albums'ten sonra soru işareti "?" userId verip burada verilene eşitleme işlemi yapmamız gerekir
            //query user alması gerekir hangi kişiye ait olduğunu belirtmek için
            params: {
              userId: user.id,
            },
          };
        },
      }),
      addAlbums: builder.mutation({
        //üçlü yazım şeklinde result, hata ve argüman olarak ne geliyorsa o döner
        invalidatesTags:(result,error,user)=>{
            return[{type:"UsersAlbum", id:user.id}]
                },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              //random bir şekilde isim ataması yapar
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbums: builder.mutation({
        invalidatesTags:(result,error,album)=>{
            return[{type:"Album", id:album.id}]
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumsMutation,
  useRemoveAlbumsMutation,
} = albumsApi;
export { albumsApi };
