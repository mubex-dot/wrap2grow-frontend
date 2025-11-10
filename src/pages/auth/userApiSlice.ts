import { wrapGrowApiSlice } from "@/app/wrapGrowApiSlice";
import type { EditUser, User } from "@/types/user.types";

const apiSliceWithTags = wrapGrowApiSlice.enhanceEndpoints({
  addTagTypes: ["user"],
});

const StatsApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<
      { message: string; status: string },
      { password: string }
    >({
      query: (values) => ({
        url: "/reset-password",
        method: "PATCH",
        body: { ...values },
      }),
      invalidatesTags: ["user"],
    }),

    editUser: builder.mutation<User, EditUser>({
      query: (values) => ({
        url: "/update-user",
        method: "PATCH",
        body: { ...values },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useChangePasswordMutation, useEditUserMutation } = StatsApiSlice;
