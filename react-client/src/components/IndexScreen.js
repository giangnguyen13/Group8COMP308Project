import React from 'react';

function IndexScreen() {
    return (
        <div className='App'>
            <h1>
                Hello, Welcome to the Health Vital Sign Tracking Application
            </h1>
            <h2>Choose your role</h2>
            <a href='/patient/login' className='btn btn-lg btn-success'>
                I'm patient
            </a>
            &nbsp;
            <a href='/nurse/login' className='btn btn-lg btn-primary'>
                I'm nurse
            </a>
        </div>
    );
}

export default IndexScreen;
