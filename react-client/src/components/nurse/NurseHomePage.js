import React from 'react';
import { isUserAuthenticated } from '../../Helper';
import { Redirect } from 'react-router-dom';

function NurseHomePage() {
    return (
        <>
            {isUserAuthenticated() ? (
                <div className='App'>This is authenticated route for nurse</div>
            ) : (
                <Redirect to='/nurse' />
            )}
        </>
    );
}

export default NurseHomePage;
