import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
