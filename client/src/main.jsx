import { TeamProvider } from "./context/TeamContext";
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <TeamProvider>
    <AuthProvider>
      <Toaster position="top-right" />
      <App />
    </AuthProvider>
  </TeamProvider>,
)
