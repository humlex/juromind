import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { DocumentsPage } from '../pages/DocumentsPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'documents',
        element: (
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
