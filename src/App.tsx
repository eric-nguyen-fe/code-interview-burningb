/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */
import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.scss';
import './i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DEFAULT_QUERY_OPTION } from 'utils/constants';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import Example from './pages/Example';
import HomePage from 'pages/HomePage';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <Example />,
  },
];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTION,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/">
            <Suspense>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={`route-${index.toString()}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
