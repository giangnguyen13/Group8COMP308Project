import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';

import Error from './components/Error';
import { isPatientAuthenticated } from './Helper';
import { isNurseAuthenticated } from './Helper';
import AppNavbar from './components/AppNavbar';

import PatientLogin from './components/patient/PatientLogin';
import CreatePatient from './components/patient/CreatePatient';
import PatientHomePage from './components/patient/PatientHomePage';

import NurseLogin from './components/nurse/NurseLogin';

const PATIENT_ROUTE_PREFIX = '/patient';
const NURSE_ROUTE_PREFIX = '/nurse';

function App() {
    const [isLogin, setIsLogin] = useState(
        isPatientAuthenticated() || isNurseAuthenticated()
    );
    return (
        <>
            <AppNavbar isLogin={isLogin} setIsLogin={setIsLogin} />
            <Router>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <div className='App'>
                                <h1>App route</h1>
                            </div>
                        )}
                    />
                    {/* Patient Route */}
                    <Route
                        exact
                        render={() => (
                            <h1>Hello Patient, you are not logged in</h1>
                        )}
                        path={`${PATIENT_ROUTE_PREFIX}`}
                    />
                    <Route
                        exact
                        render={() => <PatientLogin />}
                        path={`${PATIENT_ROUTE_PREFIX}/login`}
                    />
                    <Route
                        exact
                        render={() => <CreatePatient />}
                        path={`${PATIENT_ROUTE_PREFIX}/create`}
                    />
                    <Route
                        exact
                        render={() => <PatientHomePage />}
                        path={`${PATIENT_ROUTE_PREFIX}/home`}
                    />
                    {/* Nurse Route */}
                    <Route
                        exact
                        render={() => (
                            <h1>Hello Nurse, you are not logged in</h1>
                        )}
                        path={`${NURSE_ROUTE_PREFIX}`}
                    />
                    <Route
                        exact
                        render={() => <NurseLogin />}
                        path={`${NURSE_ROUTE_PREFIX}/login`}
                    />
                    <Route
                        exact
                        render={() => <CreatePatient />}
                        path={`${NURSE_ROUTE_PREFIX}/create`}
                    />
                    <Route
                        exact
                        render={() => <PatientHomePage />}
                        path={`${NURSE_ROUTE_PREFIX}/home`}
                    />
                    <Route path='*' render={() => <Error />} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
