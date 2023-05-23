import ErrorBoundary from '../../../Common/components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { APP_ROUTES } from '../../routes';
import { Provider } from 'react-redux';
import { store } from '../../store';

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider  store={store}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {APP_ROUTES.map(el => <Route path={el.path} key={el.path} element={el.component} />)}
        </Routes>
      </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
