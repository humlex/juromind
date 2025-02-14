import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { router } from './routes';
import { rootStore } from './store/store';

export const App = (): JSX.Element => {
  return (
    <Provider store={rootStore}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
