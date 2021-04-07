import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { isPatientAuthenticated } from '../../Helper';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = 'http://localhost:5000/api/patient/login';

    const auth = async () => {
        try {
            const loginData = { auth: { email, password } };
            const res = await axios.post(apiUrl, loginData);
            console.log(loginData);
            if (res.status === 200) {
                // maintain session in client
                sessionStorage.setItem('patientName', res.data.patientName);
                sessionStorage.setItem('patientId', res.data.patientId);
                sessionStorage.setItem('created_by', "Patient: " + res.data.patientName);

                var sessionCreated = new Date();
                var sessionExpired = new Date(
                    sessionCreated.getTime() + 5 * 60000
                );
                sessionStorage.setItem(
                    'cookieExpire',
                    sessionExpired.getTime()
                );

                window.location.href = '/patient/home';
            } else {
                sessionStorage.clear();
            }
        } catch (e) {
            //print the error
            console.log(e);
        }
    };
    return (
        <>
            <h1 className='App'>Patient Login</h1>
            <Jumbotron>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        id='email'
                        placeholder='example@example.ca'
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={auth}>
                    Login
                </Button>
                &nbsp;
                <Button variant='success' href='/patient/create'>
                    New here? Signup
                </Button>
            </Jumbotron>
        </>
    );
}

export default Login;
