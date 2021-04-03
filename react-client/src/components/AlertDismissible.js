import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible(props) {
    const [show, setShow] = useState(true);
    const { id, heading, content, sender } = props;
    return (
        <>
            <Alert show={show} variant='success' style={{ width: '450px' }}>
                <Alert.Heading>{heading}</Alert.Heading>
                <p>{content}</p>
                <div className='d-flex justify-content-end'>
                    <p className='mb-0'>-- {sender} --</p>
                </div>
                <hr />
                <div className='d-flex justify-content-end'>
                    <Button
                        onClick={() => setShow(false)}
                        variant='outline-success'
                    >
                        Thanks, I got it.!
                    </Button>
                </div>
            </Alert>

            {!show && (
                <Button onClick={() => setShow(true)}>Show Tip #{id}</Button>
            )}
        </>
    );
}

export default AlertDismissible;
