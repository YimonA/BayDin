import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baydinApi = createApi({
  reducerPath: "baydinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://baydin.onrender.com/`,
  }),
  tagTypes: ["baydin"],

  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => ({
        url: "/questions",
      }),
      providesTags: ["baydin"],
    }),
    getAnswers: builder.query({
      query: () => ({
        url: "/answers",
      }),
      providesTags: ["baydin"],
    }),
    getNumberList: builder.query({
      query: () => ({
        url: "/numberList",
      }),
      providesTags: ["baydin"],
    }),
  }),
});

export const {
  useGetAnswersQuery,
  useGetNumberListQuery,
  useGetQuestionsQuery,
} = baydinApi;
