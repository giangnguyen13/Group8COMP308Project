import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateTip() {
    const currentUrl = window.location.pathname;
    let homeRoute = currentUrl.includes('/patient')
        ? '/patient'
        : currentUrl.includes('/nurse')
        ? '/nurse'
        : '/';
        
    const [tip, setTip] = useState({
        title: '',
        content: '',
        sender: '',
        receiver: '',
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = 'http://localhost:5000/api/nurse/tip';
    const [patients, setPatients] = useState([]);
    const saveData = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            title: tip.title,
            content: tip.content,
            sender: sessionStorage.getItem('nurseName'),
            receiver: tip.receiver,
        };
        axios
            .post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                window.location.href = `${homeRoute}/home`;
            })
            .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setTip({ ...tip, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setShowLoading(true);
        const fetchData = async () => {
            const result = await axios('http://localhost:5000/api/patients');
            console.log(result);
            setPatients(result.data);
            setShowLoading(false);
        };

        fetchData();
        setShowLoading(false);
    }, []);
    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <Jumbotron>
                <Form onSubmit={saveData}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Tip title'
                            value={tip.title}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as='textarea'
                            type='text'
                            name='content'
                            id='content'
                            placeholder='Tip Content'
                            value={tip.content}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Patient receiver</Form.Label>
                        <Form.Control
                            as='select'
                            type='text'
                            name='receiver'
                            id='receiver'
                            value={tip.receiver}
                            onChange={onChange}
                        >
                            <option value='' disabled={true}>
                                -- Choose one --
                            </option>
                            <option value='ALL'>Send to all patients</option>
                            {patients.map((value, key) => {
                                const { fullName } = value;
                                return (
                                    <option key={key} value={fullName}>
                                        {fullName}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Button variant='success' type='submit'>
                        Send Motivational tip
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default CreateTip;
