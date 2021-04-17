import React, { useEffect, useState } from 'react';
import logo from '../local_hospital_black_48dp.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function AppNavbar(props) {
    const { isLogin, setIsLogin } = props;
    const [isPatient, setPatient] = useState(false);
    const [isNurse, setNurse] = useState(false);

    const patientID = sessionStorage.getItem('patientId');

    const currentUrl = window.location.pathname;
    let homeRoute = currentUrl.includes('/patient')
        ? '/patient'
        : currentUrl.includes('/nurse')
        ? '/nurse'
        : '/';

    const deleteCookie = async () => {
        try {
            await axios.get('http://localhost:5000/logout');
            sessionStorage.clear();
            setIsLogin(false);
            window.location.href = '/';
            setPatient(false);
            setNurse(false);
        } catch (e) {
            console.log(e);
        }
    };

    const NavRenderer = () => {
        if (isPatient) {
            return (
                <Nav.Link
                    onClick={() => deleteCookie()}
                    className='btn btn-outline-primary'
                >
                    Logout
                </Nav.Link>
            );
        }
    };

    useEffect(() => {
        if (isLogin) {
            console.log('homeRoute', homeRoute);
            if (homeRoute == `/patient`) {
                setPatient(true);
                console.log('patient');
            }
            if (homeRoute == `/nurse`) {
                setNurse(true);
                console.log('nurse');
            }
        }
    }, [isLogin]);

    return (
        <Navbar bg='light' expand='lg'>
            <a
                className='navbar-brand'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarsExampleDefault'
                aria-controls='navbarsExampleDefault'
                aria-expanded='false'
                aria-label='Toggle navigation'
                href='https://github.com/giangnguyen13/MERN-PROJ'
                target='_blank'
                rel='noopener'
            >
                <img src={logo} alt='logo' />
            </a>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link href={isLogin ? `${homeRoute}/home` : homeRoute}>
                        Home
                    </Nav.Link>
                    {isPatient && (
                        <>
                            <Nav.Link href={`${homeRoute}/emergency`}>
                                Emergency Alert
                            </Nav.Link>
                            <Nav.Link href={`${homeRoute}/videolist`}>
                                Motivation Video
                            </Nav.Link>
                            <Nav.Link href={`${homeRoute}/dailyInfo`}>
                                Enter Vital Signs
                            </Nav.Link>
                            <Nav.Link
                                href={
                                    `${homeRoute}/listAllDailyInfoById/` +
                                    patientID
                                }
                            >
                                List Vital Signs
                            </Nav.Link>
                            <Nav.Link href={`${homeRoute}/checklist`}>
                                Check List
                            </Nav.Link>
                        </>
                    )}
                    {isNurse && (
                        <>
                            <Nav.Link href={`${homeRoute}/listPatients`}>
                                List of Patients
                            </Nav.Link>
                        </>
                    )}
                </Nav>
                {!isLogin ? (
                    <>
                        <Nav.Link
                            href='/patient/login'
                            className='btn btn-outline-success'
                        >
                            Patient Login
                        </Nav.Link>
                        &nbsp;&nbsp;
                        <Nav.Link
                            href='/nurse/login'
                            className='btn btn-outline-primary'
                        >
                            Nurse Login
                        </Nav.Link>
                    </>
                ) : (
                    <Nav.Link
                        onClick={() => deleteCookie()}
                        className='btn btn-outline-primary'
                    >
                        Logout
                    </Nav.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavbar;
