import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateNurse() {
    const [nurse, setNurse] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = 'http://localhost:5000/api/';

    const saveUser = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            firstName: nurse.firstName,
            lastName: nurse.lastName,
            username: nurse.username,
            password: nurse.password,
        };
        axios
            .post(apiUrl + 'nurses', data)
            .then((result) => {
                console.log('in save nurses');
                setShowLoading(false);
                window.location.href = '/nurse/login';
            })
            .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setNurse({ ...nurse, [e.target.name]: e.target.value });
    };
    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <Form onSubmit={saveUser}>
                    <Form.Group>
                        <Form.Label> First Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            value={nurse.firstName}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            value={nurse.lastName}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            name='username'
                            id='username'
                            rows='3'
                            placeholder='Enter username'
                            value={nurse.username}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter password'
                            value={nurse.password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>
                        Create nurse
                    </Button>
                    &nbsp;
                    <Button variant='primary' href='/nurse/login'>
                        Have account? Login
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default CreateNurse;
