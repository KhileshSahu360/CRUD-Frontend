import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import AddUser from './Components/AddUser/AddUser.jsx'
import UpdateUser from './Components/UpdateUser/UpdateUser.jsx'
import { Provider } from 'react-redux'
import store from './Components/Store/Store.jsx'
import Demo from './Demo.jsx'

const router = createBrowserRouter([
  {path : '/', element:<App/>},
  {path : '/AddUser', element:<AddUser/>},
  {path : '/UpdateUser/:id', element:<UpdateUser/>},
  {path : '/Demo', element:<Demo/>},

])
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)
