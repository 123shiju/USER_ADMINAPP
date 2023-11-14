import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,
  createRoutesFromElements,Route,RouterProvider 
} from 'react-router-dom'

import store from './store.js'

import { Provider } from 'react-redux'

import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import PrivateRoute from './Components/PrivateRoute.jsx'

import Homescreens from './Screens/Homescreens.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import ProfileScreen from './Screens/ProfileScreen.jsx' 

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route  index={true} path='/' element={< Homescreens />}   />
      <Route   path='/login' element={<LoginScreen />}   />
      <Route   path='/register' element={<RegisterScreen />}   />
      <Route  path='' element={<PrivateRoute />} />
      <Route path='/profile'  element={ <ProfileScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store} >
<React.StrictMode>
   <RouterProvider router={ router } />
  </React.StrictMode>
  </Provider>
)
