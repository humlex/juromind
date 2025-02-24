import { FormEvent, useState } from 'react';
import {
  useGetDocumentsQuery,
  useCreateDocumentMutation,
} from 'features/documents/api/documents.api';
import {
  ALLOWED_DOCUMENT_EXTENSIONS,
  ALLOWED_DOCUMENT_MIME_TYPES,
  DocumentMimeType,
} from 'types/document.types';

export const DocumentsPage = () => {
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const { data: documents, error, isLoading } = useGetDocumentsQuery();
  const [createDocument, { isLoading: isUploading }] =
    useCreateDocumentMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (!ALLOWED_DOCUMENT_MIME_TYPES.includes(file.type as DocumentMimeType)) {
      console.error('Invalid file type');
      return;
    }

    try {
      await createDocument({ title, file }).unwrap();
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleDownload = (fileUrl: string, title: string) => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = title + '.docx';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Upload Document
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Document Title
            </label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              File
            </label>
            <input
              type="file"
              id="file"
              required
              accept={ALLOWED_DOCUMENT_EXTENSIONS.join(',')}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading || !file}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error fetching documents</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {documents?.map((doc) => (
                <li
                  key={doc.id}
                  className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
                >
                  <span>{doc.title}</span>
                  <button
                    onClick={() => handleDownload(doc.file, doc.title)}
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
