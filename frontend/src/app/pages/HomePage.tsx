import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to JuroMind
          </h1>
          <Link
            to="/documents"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Documents
          </Link>
        </div>
      </div>
    </div>
  );
};
