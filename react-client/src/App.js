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
import VideoList from './components/patient/VideoList';
import DailyInfo from './components/patient/DailyInfo';
import CheckList from './components/patient/CheckList';
import Emergency from './components/patient/Emergency';
import ListPatients from './components/patient/ListPatients';
import ListDailyInfo from './components/patient/ListDailyInfo';

import NurseLogin from './components/nurse/NurseLogin';
import CreateNurse from './components/nurse/CreateNurse';
import NurseHomePage from './components/nurse/NurseHomePage';
import RequiredVitalSigns from './components/nurse/RequiredVitalSigns';
import CreateTip from './components/nurse/CreateTip';

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
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <Emergency />
                            ) : (
                                <NotLoginScreen
                                    route={`${PATIENT_ROUTE_PREFIX}/login`}
                                />
                            )
                        }
                        path={`${PATIENT_ROUTE_PREFIX}/emergency`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <VideoList />
                            ) : (
                                <NotLoginScreen
                                    route={`${PATIENT_ROUTE_PREFIX}/login`}
                                />
                            )
                        }
                        path={`${PATIENT_ROUTE_PREFIX}/videolist`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <DailyInfo />
                            ) : (
                                <NotLoginScreen
                                    route={`${PATIENT_ROUTE_PREFIX}/login`}
                                />
                            )
                        }
                        path={`${PATIENT_ROUTE_PREFIX}/dailyInfo`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <ListDailyInfo />
                            ) : (
                                <NotLoginScreen
                                    route={`${PATIENT_ROUTE_PREFIX}/login`}
                                />
                            )
                        }
                        path={`${PATIENT_ROUTE_PREFIX}/listAllDailyInfoById/:patientId`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <CheckList />
                            ) : (
                                <NotLoginScreen
                                    route={`${PATIENT_ROUTE_PREFIX}/login`}
                                />
                            )
                        }
                        path={`${PATIENT_ROUTE_PREFIX}/checklist`}
                    />
                    {/* Nurse Route */}
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <ListPatients />
                            ) : (
                                <NotLoginScreen
                                    route={`${NURSE_ROUTE_PREFIX}/login`}
                                    userRole='Nurse'
                                />
                            )
                        }
                        path={`${NURSE_ROUTE_PREFIX}/listPatients`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <CreateTip />
                            ) : (
                                <NotLoginScreen
                                    route={`${NURSE_ROUTE_PREFIX}/login`}
                                    userRole='Nurse'
                                />
                            )
                        }
                        path={`${NURSE_ROUTE_PREFIX}/CreateTip`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <RequiredVitalSigns />
                            ) : (
                                <NotLoginScreen
                                    route={`${NURSE_ROUTE_PREFIX}/login`}
                                    userRole='Nurse'
                                />
                            )
                        }
                        path={`${NURSE_ROUTE_PREFIX}/requiredVitalSigns`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <DailyInfo />
                            ) : (
                                <NotLoginScreen
                                    route={`${NURSE_ROUTE_PREFIX}/login`}
                                />
                            )
                        }
                        path={`${NURSE_ROUTE_PREFIX}/dailyInfo`}
                    />
                    <Route
                        exact
                        render={() =>
                            isUserAuthenticated() ? (
                                <ListDailyInfo />
                            ) : (
                                <NotLoginScreen
                                    route={`${NURSE_ROUTE_PREFIX}/login`}
                                    userRole='Nurse'
                                />
                            )
                        }
                        path={`${NURSE_ROUTE_PREFIX}/listAllDailyInfoById/:patientId`}
                    />
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
