import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/design-system.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import "./styles/components.css";
import "./styles/dashboard.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
