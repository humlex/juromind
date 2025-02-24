import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from 'features/auth/slice/auth.slice';
import { authApi } from 'features/auth/api/auth.api';
import documentsReducer from 'features/documents/slice/documents.slice';
import { documentsApi } from 'features/documents/api/documents.api';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      documents: documentsReducer,
      [authApi.reducerPath]: authApi.reducer,
      [documentsApi.reducerPath]: documentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        documentsApi.middleware
      ),
  });

export const rootStore = makeStore();

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
