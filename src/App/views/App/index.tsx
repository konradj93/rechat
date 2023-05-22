import ErrorBoundary from '../../../Common/components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { APP_ROUTES } from '../../routes';

export const App = () => {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {APP_ROUTES.map(el => <Route path={el.path} key={el.path} element={el.component} />)}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
