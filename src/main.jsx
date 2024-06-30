import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path= '/'>
      <Route path= '/' element={<Login />}/>
      <Route path= 'eventTable' element={<App />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
