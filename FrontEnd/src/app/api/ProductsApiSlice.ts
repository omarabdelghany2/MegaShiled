import {
  ProductProps,
  Product,
  CloudinaryImage,
} from "@/types"
import { apiSlice } from "./api"

const productsSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addProduct: builder.mutation<Product, ProductProps>({
      query: arg => ({
        url: "/products/create",
        method: "POST",
        credentials: "include",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { product: ProductProps; id: string }
    >({
      query: arg => ({
        url: `/products/${arg.id}`,
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(arg.product),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    uploadImage: builder.mutation<
    CloudinaryImage,
    FormData // Directly expect FormData
  >({
    query: (formData) => ({
      url: `/products/upload-image`,
      method: "POST",
      credentials: "include",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    }),
  }),
    GetProductByID: builder.query<any, { id: string }>({
      query: arg => ({
        url: `/products/${arg.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    GetProducts: builder.query<{
      [x: string]: any; products: { id: string; name: string; price: number ; description: string; imageFileName: string; colors: string[]; featured: boolean; freeShipping: boolean; inventory: number; }[] 
}, any>({
      query: arg => ({
        url: `/products`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
  
})

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useGetProductsQuery
} = productsSlice
