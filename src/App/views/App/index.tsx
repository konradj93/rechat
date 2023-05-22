import ErrorBoundary from '../../../Common/components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

export const App = () => {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello rechat</h1>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
