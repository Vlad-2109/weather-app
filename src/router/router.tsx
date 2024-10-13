import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SavedCards } from '../pages/SavedCards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/saved-cards',
    element: <SavedCards />,
  },
]);
