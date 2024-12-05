import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import Calendar from './components/Calendar.jsx'
import Error from './components/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <CustomerList />,
        index: true
      },
      {
        path: "trainings",
        element: <TrainingList />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
