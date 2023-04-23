import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';
const auth=getAuth(app)

const Login = () => {
  const [error,seterror]= useState('');
  const [success,setsuccess]=useState('');
  const emailRef=useRef();


  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password}`);
    // Add your authentication logic here
    seterror('');
    setsuccess('');
    //validation
    const form=event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      seterror(' Please add at lest two uppercase.');
      return
  
    }
    else if(!/(?=.*[!@#$&*])/.test(password)){
      seterror('please add special character')
      return
    }
    else if(password.length<6){
      seterror('password must be six character')
      return
    }
    signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        const loggedUser=result.user;
        setsuccess('User LoggedIn Successfully')
        seterror('');

      })
      .catch(error=>{
        seterror(error.message)
      })
    }
    const handleResetPass = event =>{
     const email = emailRef.current.value;
     if(!email){
      alert('Please provide your email address to reset password');
     }
     sendPasswordResetEmail(auth,email)
     .then(()=>{
      alert('Please Check Your Email');
     })
     .catch(error=>{
      console.log(error);
      seterrowwwvbbr(error.message)
     })
    }
  
  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center my-4">Please Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className='pb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control ref={emailRef} name='email' type="email" placeholder="Enter email"   required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='pb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type="password" placeholder="Password"  required/>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
          <p><small>Forget Password ? Please <button className='btn btn-link' onClick={handleResetPass}>Reset Password</button></small></p>
          <p><small>New to this website ? <Link to="/register">Register</Link></small></p>
          <p className='text-danger'>{error}</p>
          <p className='text-primary'>{success}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
