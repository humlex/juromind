export interface Document {
  id: number;
  title: string;
  file: string;
  owner: number;
  created_at: string;
  updated_at: string;
}

export interface DocumentsState {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

export interface CreateDocumentPayload {
  title: string;
  file: File;
}

export interface UpdateDocumentPayload {
  id: number;
  title: string;
}