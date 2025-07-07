// src/redux/api/portfolioApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfoliobe-hq9q.onrender.com/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Profile",
    "Projects",
    "Skills",
    "Experience",
    "Messages",
    "AdminAbout",
    "GetInTouch",
  ],
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: { token: string };
      },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getProfile: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          roles: string;
          description: string;
          resumeUrl: string;
          imageUrl: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: any;
      },
      void
    >({
      query: () => "/admin/profile",
      providesTags: ["Profile"],
    }),

    getAbout: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: any;
      },
      void
    >({
      query: () => "/admin/about",
      providesTags: ["AdminAbout"],
    }),
    updateAbout: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: any;
      },
      { description: string }
    >({
      query: (body) => ({
        url: "/admin/about",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminAbout"],
    }),
    getAdminSkills: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          iconName: string;
          createdAt: string;
          updatedAt: string;
        }[];
        meta: any;
      },
      void
    >({
      query: () => "/admin/skills",
      providesTags: ["Skills"],
    }),

    addSkill: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          iconName: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: any;
      },
      {
        name: string;
        iconName: string;
      }
    >({
      query: (body) => ({
        url: "/admin/skills",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkill: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          iconName: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: any;
      },
      {
        id: number;
        name: string;
        iconName: string;
      }
    >({
      query: ({ id, name, iconName }) => ({
        url: `/admin/skills/${id}`,
        method: "PUT",
        body: { name, iconName }, // ✅ Explicit body
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteSkill: builder.mutation<
      {
        success: boolean;
        message: string;
        data: null;
        meta: any;
      },
      number // skill ID
    >({
      query: (id) => ({
        url: `/admin/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),

    getAdminMessages: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          email: string;
          message: string;
          createdAt: string;
          updatedAt: string;
        }[];
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/admin/messages",
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
    getAdminGetInTouch: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          address: string;
          email: string;
          phone: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/admin/getInTouch",
        method: "GET",
      }),
      providesTags: ["GetInTouch"],
    }),
    updateAdminGetInTouch: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          address: string;
          email: string;
          phone: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      {
        address: string;
        email: string;
        phone: string;
      }
    >({
      query: (body) => ({
        url: "/admin/getInTouch",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["GetInTouch"],
    }),
    getAdminExperiences: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          companyName: string;
          duration: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        }[];
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/admin/experiences",
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),
    addExperience: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          companyName: string;
          duration: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      {
        title: string;
        companyName: string;
        duration: string;
        description: string;
      }
    >({
      query: (body) => ({
        url: "/admin/experiences",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Experience"],
    }),
    updateExperience: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          companyName: string;
          duration: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      {
        id: number;
        body: {
          title: string;
          companyName: string;
          duration: string;
          description: string;
        };
      }
    >({
      query: ({ id, body }) => ({
        url: `/admin/experiences/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Experience"],
    }),
    deleteExperience: builder.mutation<
      {
        success: boolean;
        message: string;
        data: null;
        meta: null;
      },
      number
    >({
      query: (id) => ({
        url: `/admin/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),
    addProject: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          gitHubUrl: string | null;
          liveUrl: string | null;
          imageUrl: string;
          tech: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      FormData
    >({
      query: (formData) => ({
        url: `/admin/projects`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),
    getAdminProjects: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          gitHubUrl: string | null;
          liveUrl: string | null;
          imageUrl: string;
          tech: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        }[];
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/admin/projects",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    updateProject: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          gitHubUrl: string | null;
          liveUrl: string | null;
          imageUrl: string;
          tech: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/admin/projects/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteProject: builder.mutation<
      {
        success: boolean;
        message: string;
        data: null;
        meta: null;
      },
      number
    >({
      query: (id) => ({
        url: `/admin/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    getUserHome: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          roles: string;
          description: string;
          resumeUrl: string;
          imageUrl: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/user/getHome",
        method: "GET",
      }),
    }),
    getUserAbout: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          about: {
            id: number;
            description: string;
            createdAt: string;
            updatedAt: string;
          };
          skills: {
            id: number;
            name: string;
            iconName: string;
            createdAt: string;
            updatedAt: string;
          }[];
          experiences: {
            id: number;
            title: string;
            companyName: string;
            duration: string;
            description: string;
            createdAt: string;
            updatedAt: string;
          }[];
        };
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/user/getAbout",
        method: "GET",
      }),
    }),
    getUserProjects: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          title: string;
          gitHubUrl: string | null;
          liveUrl: string | null;
          imageUrl: string;
          tech: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        }[];
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/user/getProjects",
        method: "GET",
      }),
    }),
    getUserInTouch: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          address: string;
          email: string;
          phone: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      void
    >({
      query: () => ({
        url: "/user/getInTouch",
        method: "GET",
      }),
    }),
    sendUserMessage: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          email: string;
          message: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: null;
      },
      {
        name: string;
        email: string;
        message: string;
      }
    >({
      query: (body) => ({
        url: "/user/messages",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: number;
          name: string;
          roles: string;
          description: string;
          resumeUrl: string;
          imageUrl: string;
          createdAt: string;
          updatedAt: string;
        };
        meta: any;
      },
      {
        name: string;
        roles: string;
        description: string;
        resume?: File;
        image?: File;
      }
    >({
      query: (body) => {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("roles", body.roles);
        formData.append("description", body.description);
        if (body.resume) formData.append("resume", body.resume);
        if (body.image) formData.append("image", body.image);

        return {
          url: "/admin/profile",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetProfileQuery,
  useGetAboutQuery,
  useUpdateAboutMutation,
  useGetAdminSkillsQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetAdminMessagesQuery,
  useGetAdminGetInTouchQuery,
  useUpdateAdminGetInTouchMutation,
  useGetAdminExperiencesQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useGetAdminProjectsQuery,
  useUpdateProjectMutation,
  useGetUserHomeQuery,
  useGetUserAboutQuery,
  useGetUserProjectsQuery,
  useGetUserInTouchQuery,
  useSendUserMessageMutation,
  useUpdateProfileMutation,
} = portfolioApi;
