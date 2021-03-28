import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import './App.css';

import Error from './components/Error';
import { isUserAuthenticated } from './Helper';
import AppNavbar from './components/AppNavbar';
import IndexScreen from './components/IndexScreen';
import NotLoginScreen from './components/NotLoginScreen';

import PatientLogin from './components/patient/PatientLogin';
import CreatePatient from './components/patient/CreatePatient';
import PatientHomePage from './components/patient/PatientHomePage';

import NurseLogin from './components/nurse/NurseLogin';
import CreateNurse from './components/nurse/CreateNurse';
import NurseHomePage from './components/nurse/NurseHomePage';

const PATIENT_ROUTE_PREFIX = '/patient';
const NURSE_ROUTE_PREFIX = '/nurse';

function App() {
    const [isLogin, setIsLogin] = useState(isUserAuthenticated());
    return (
        <>
            <AppNavbar isLogin={isLogin} setIsLogin={setIsLogin} />
            <Router>
                <Switch>
                    <Route exact path='/' render={() => <IndexScreen />} />
                    {/* Patient Route */}
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <Redirect to={`${PATIENT_ROUTE_PREFIX}/home`} />
                            ) : (
                                <NotLoginScreen
                                    route={`${PATIENT_ROUTE_PREFIX}/login`}
                                    userRole='Patient'
                                />
                            )
                        }
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
                        render={() =>
                            isUserAuthenticated() ? (
                                <Redirect to={`${NURSE_ROUTE_PREFIX}/home`} />
                            ) : (
                                <NotLoginScreen
                                    route={`${NURSE_ROUTE_PREFIX}/login`}
                                    userRole='Nurse'
                                />
                            )
                        }
                        path={`${NURSE_ROUTE_PREFIX}`}
                    />
                    <Route
                        exact
                        render={() => <NurseLogin />}
                        path={`${NURSE_ROUTE_PREFIX}/login`}
                    />
                    <Route
                        exact
                        render={() => <CreateNurse />}
                        path={`${NURSE_ROUTE_PREFIX}/create`}
                    />
                    <Route
                        exact
                        render={() => <NurseHomePage />}
                        path={`${NURSE_ROUTE_PREFIX}/home`}
                    />

                    {/* Default route -> Render 404 Error page */}
                    <Route path='*' render={() => <Error />} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
