export enum DocumentMimeType {
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export const ALLOWED_DOCUMENT_MIME_TYPES = Object.values(DocumentMimeType);

export const ALLOWED_DOCUMENT_EXTENSIONS = ['.doc', '.docx'];