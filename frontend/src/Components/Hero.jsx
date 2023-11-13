import { Container ,Card,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


import React from 'react'

const Hero = () => {
  return (
    <div className="py-5">
        <Container className="d-flex justify-content-center">
            <Card className="'p-5 d-flex flex-colomn align-items-center hero-card bg-light w-75">
                <h1>MERN Authentication</h1>
                <p className="text-center mb-4">this is a boiler</p>
                <div className="d-flex">
                    <LinkContainer to='/login'>
                    <button variant='primary' className="me-3">
                        Sign In
                    </button>
                    </LinkContainer>
                    <LinkContainer to='/register' >
                    <Button variant='secondary'>
                        Sign Up
                    </Button>
                    </LinkContainer>
                </div>
            </Card>
        </Container>
    </div>
  )
}

export default Hero
