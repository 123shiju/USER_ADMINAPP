import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './Components/Header'
// import Homescreens from './Screens/Homescreens'
const App = () => {
  return (
    <>
    <Header />
    <Container className='my-2' >
      <Outlet />
    </Container>
    </>
  )
}

export default App
