import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CVContainer } from './components/cv.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>CV Builder</h1>
    <CVContainer />
  </StrictMode>,
)
