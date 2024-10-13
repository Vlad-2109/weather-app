import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer position="bottom-right" autoClose={2000} />
  </>,
);
