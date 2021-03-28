import React from 'react';
import { isUserAuthenticated } from '../../Helper';
import { Redirect } from 'react-router-dom';

function PatientHomePage() {
    return (
        <>
            {isUserAuthenticated() ? (
                <div className='App'>
                    This is authenticated route for patient
                </div>
            ) : (
                <Redirect to='/patient' />
            )}
        </>
    );
}

export default PatientHomePage;
