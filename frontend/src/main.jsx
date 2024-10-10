import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.jsx'
import AuthLayout from '../src/components/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import HomePage from './pages/HomePage.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import TasksPage from './pages/TasksPage.jsx'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path='/' element={<Layout />}>

        <Route path='' element={<HomePage />} />

        <Route path='/signup' element={<AuthLayout authentication={false}>
            {" "}
            <Signup />
          </AuthLayout>} />

        <Route path='/login' element={<AuthLayout authentication={false}>
          {" "}
          <Login />
        </AuthLayout>} />

        <Route path='/tasks' element={<AuthLayout authentication>
          {" "}
          <TasksPage />
        </AuthLayout>} />
        
        <Route path='/profile/:id' element={<AuthLayout authentication>
          {" "}
          <Profile />
        </AuthLayout>} />

        <Route path='/reset-password' element={<AuthLayout authentication={false}>
          {" "}
          <ResetPassword />
        </AuthLayout>} />

      </Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
