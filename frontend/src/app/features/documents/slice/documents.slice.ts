import { createSlice } from '@reduxjs/toolkit';
import { Document } from '../types';

interface DocumentsState {
  selectedDocument: Document | null;
  error: string | null;
}

const initialState: DocumentsState = {
  selectedDocument: null,
  error: null,
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setSelectedDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    clearSelectedDocument: (state) => {
      state.selectedDocument = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setSelectedDocument, clearSelectedDocument, clearError } = documentsSlice.actions;
export default documentsSlice.reducer;
