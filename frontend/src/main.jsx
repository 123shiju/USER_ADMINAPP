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

  // import from userside
import Homescreens from './Screens/Homescreens.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import ProfileScreen from './Screens/ProfileScreen.jsx' 


// import from adminside
import AdminHomeScreen from './Screens/AdminHomeScreen.jsx'
import AdminLoginScreen from './Screens/AdminLoginScreen.jsx'
import AdminPrivateRoute from './Components/AdminPrivateRoute.jsx'

import UsersListScreen from "./Screens/UserListScreen.jsx"
import FormList from './Screens/FormList.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    // user side routes
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Homescreens />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />} />
      <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/admin' element={<AdminHomeScreen />} />
      
      {/* admin side Routes */}
      <Route path='/admin/login' element={<AdminLoginScreen />} />
      <Route path='' element={<AdminPrivateRoute />}>
        <Route path="/admin/users-list" element={<UsersListScreen />} />
        <Route path='/form-list/:userId' element={<FormList /> } ></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

