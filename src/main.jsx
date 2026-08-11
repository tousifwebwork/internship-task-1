import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router";
createRoot(document.getElementById('root')).render( 
<BrowserRouter>
<Toaster position="top-center"/>
    <App /> 
</BrowserRouter>
)
