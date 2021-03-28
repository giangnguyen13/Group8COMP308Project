import React from 'react';
import Button from 'react-bootstrap/Button';

function NotLoginScreen(props) {
    const { route, userRole } = props;
    return (
        <div className='App'>
            <h1>Hello {userRole}, you are not logged in</h1>
            <Button variant='success' href={route}>
                Login here
            </Button>
        </div>
    );
}

export default NotLoginScreen;
