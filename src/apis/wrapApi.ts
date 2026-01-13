import { wrapGrowApiSlice } from "@/app/wrapGrowApiSlice";
import type { Pagination } from "@/types/user.types";
import type { WeatherResponse } from "@/types/weather.types";
import type { WrapInput, WrapResponse, Wraps } from "@/types/wrap.types";

const apiSliceWithTags = wrapGrowApiSlice.enhanceEndpoints({
  addTagTypes: ["wrap"],
});

const WrapsApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getWraps: builder.query<
      {
        message: string;
        data: WrapResponse;
        status: string;
        pagination: Pagination;
      },
      void
    >({
      query: () => "/wrap",
      providesTags: ["wrap"],
    }),
    getWeatherInfo: builder.query<
      {
        message: string;
        data: WeatherResponse;
        status: string;
      },
      void
    >({
      query: () => "/wrap/weather",
      providesTags: ["wrap"],
    }),
    addWraps: builder.mutation<
      { data: Wraps; message: string; status: string },
      WrapInput
    >({
      query: (values) => ({
        url: "/wrap",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["wrap"],
    }),
  }),
});

export const { useGetWrapsQuery, useGetWeatherInfoQuery, useAddWrapsMutation } =
  WrapsApiSlice;
