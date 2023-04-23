import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Layout/main';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import RegisterRBS from './Components/RegisterRBS/RegisterRBS';
import RegisterBS from './Components/RegisterBS/RegisterBS';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/login",
        element:<Login></Login>
      },
      {
        path: "/register",
        element:<Register></Register>
      },
      {
        path: "/registerrbs",
        element:<RegisterRBS></RegisterRBS>
      },
      {
        path: "/registerbs",
        element:<RegisterBS></RegisterBS>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
