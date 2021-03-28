import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='App'>
            <h1>Error Page</h1>
            <Link to='/' className='btn btn-success'>
                Back Home
            </Link>
        </div>
    );
}

export default Error;
