import { useState } from "react";
import { Link } from 'react-router-dom'
import { Form,Button,Row,Col } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";




const RegisterScreen = () => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [Confirmpassword,setConfirmPassword]=useState('')

    const submitHandler=async(e)=>{
        e.preventDefault();
        console.log('submit')
    }
  return (
    <FormContainer >
        <h1>Sign Up</h1>
        <Form onsubmit={submitHandler}>
        <Form.Group className="my-2" controlId='name' >
                <Form.Label>
                Name
                </Form.Label>
                <Form.Control type='text'
                placeholder="enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group className="my-2" controlId='email' >
                <Form.Label>
                    Email Adress
                </Form.Label>
                <Form.Control type='email'
                placeholder="enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group className="my-2" controlId='password' >
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control type='password'
                placeholder="enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId='confirmPassword' >
                <Form.Label>
                  Confirm Password
                </Form.Label>
                <Form.Control type='password'
                placeholder="confirm password"
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant="primary" className="mt-3">
                Sign Up
            </Button>

            <Row className="py-3">
                <Col>
                New Customer ? <Link to='/register'>Register</Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}

export default RegisterScreen
