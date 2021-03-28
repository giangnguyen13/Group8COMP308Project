import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreatePatient(props) {
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = 'http://localhost:5000/api/';

    const saveUser = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            password: patient.password,
        };
        axios
            .post(apiUrl + 'patients', data)
            .then((result) => {
                setShowLoading(false);
                window.location.href = '/patient/login';
            })
            .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setPatient({ ...patient, [e.target.name]: e.target.value });
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
                            value={patient.firstName}
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
                            value={patient.lastName}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            name='email'
                            id='email'
                            rows='3'
                            placeholder='Enter email'
                            value={patient.email}
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
                            value={patient.password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>
                        Create patient
                    </Button>
                    &nbsp;
                    <Button variant='primary' href='/patient/login'>
                        Have account? Login
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default CreatePatient;
