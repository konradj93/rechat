import ErrorBoundary from '../../../Common/components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { APP_ROUTES } from '../../routes';
import { TaskProvider } from '../../../Tasks/context';
import { PageNotFound } from '../../../Common/views/404';

export const App = () => {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {APP_ROUTES.map((el) => (
              <Route path={el.path} key={el.path} element={el.component} />
            ))}
            <Route path="/notfound" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </ErrorBoundary>
  );
};
