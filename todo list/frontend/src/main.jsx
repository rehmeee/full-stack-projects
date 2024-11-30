import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Navbar from './components/navbar.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
    <App />
  </BrowserRouter>
);
