import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import Error from './components/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customers",
        element: <CustomerList />,
      },
      {
        path: "trainings",
        element: <TrainingList />,
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


