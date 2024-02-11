import { createBrowserRouter,  } from 'react-router-dom'
import App from './app'
import Home from './home'
import { Register } from './Menus/register'
import { Login } from './Menus/login'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Pagina de erro
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  }
])