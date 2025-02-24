import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { API_URL } from '../../../features/auth/slice/auth.slice';
import {
  CreateDocumentPayload,
  Document,
  UpdateDocumentPayload,
} from '../types';

export const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const csrfToken = Cookies.get('csrftoken');
      if (csrfToken) {
        headers.set('X-CSRFToken', csrfToken);
      }
      return headers;
    },
  }),
  tagTypes: ['Documents'],
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void>({
      query: () => '/documents/',
      providesTags: ['Documents'],
      transformErrorResponse: (response) => {
        return `Failed to fetch documents: ${response.status}`;
      },
    }),

    createDocument: builder.mutation<Document, CreateDocumentPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('file', payload.file);

        return {
          url: '/documents/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Documents'],
      transformErrorResponse: (response) => {
        return `Failed to create document: ${response.status}`;
      },
    }),

    updateDocument: builder.mutation<Document, UpdateDocumentPayload>({
      query: (payload) => ({
        url: `/documents/${payload.id}/`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { title: payload.title },
      }),
      invalidatesTags: ['Documents'],
      transformErrorResponse: (response) => {
        return `Failed to update document: ${response.status}`;
      },
    }),

    deleteDocument: builder.mutation<void, number>({
      query: (id) => ({
        url: `/documents/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents'],
      transformErrorResponse: (response) => {
        return `Failed to delete document: ${response.status}`;
      },
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentsApi;
