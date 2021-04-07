import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function NurseLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = 'http://localhost:5000/api/nurse/login';

    const auth = async () => {
        try {
            const loginData = { auth: { username, password } };
            const res = await axios.post(apiUrl, loginData);

            if (res.status === 200) {
                // maintain session in client
                sessionStorage.setItem('nurseName', res.data.nurseName);
                sessionStorage.setItem('nurseId', res.data.nurseId);
                sessionStorage.setItem('created_by', "Nurse: " + res.data.nurseName);

                var sessionCreated = new Date();
                var sessionExpired = new Date(
                    sessionCreated.getTime() + 5 * 60000
                );
                sessionStorage.setItem(
                    'cookieExpire',
                    sessionExpired.getTime()
                );

                window.location.href = '/nurse/home';
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
            <h1 className='App'>Nurse Login</h1>
            <Jumbotron>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        name='username'
                        id='username'
                        placeholder='username'
                        onChange={(e) => setUsername(e.target.value)}
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
                <Button variant='success' href='/nurse/create'>
                    New here? Signup
                </Button>
            </Jumbotron>
        </>
    );
}

export default NurseLogin;
