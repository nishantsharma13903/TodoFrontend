import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Authentication/Signup'
import Login from '../Authentication/Login'
import ForgotPassword from '../Authentication/ForgotPassword'
import HomePage from '../pages/homePage/HomePage'
import PrivateComponent from '../components/privateComponent/PrivateComponent'

export default function AllRoutes() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<HomePage />}></Route>
        </Route>
      </Routes>
    </div>
  )
}
