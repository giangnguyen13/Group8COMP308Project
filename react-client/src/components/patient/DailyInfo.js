import React, { useState, useEffect } from 'react';
import { isUserAuthenticated } from '../../Helper';
import { Redirect } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiUrl } from '../../Helper';

function DailyInfo() {
    const currentUrl = window.location.pathname;
    let homeRoute = currentUrl.includes('/patient')
        ? '/patient'
        : currentUrl.includes('/nurse')
        ? '/nurse'
        : '/';

    const patientID = sessionStorage.getItem('patientId');
    const created_by = sessionStorage.getItem('created_by');

    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);
    const [dailyInfo, setDailyInfo] = useState({
        pulseRate: '',
        bloodPressure: '',
        weight: '',
        temperature: '',
        respiratoryRate: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(apiUrl + `nurse/getRequiredVitalSigns/${patientID}`)
                .then((result) => {
                    setShowLoading(false);
                    setData(result.data);
                })
                .catch((error) => {
                    console.log('error in fetchData:', error);
                    setListError(true);
                });
        };
        fetchData();
    }, []);

    const saveDailyInfo = () => {
        const data = {
            pulseRate: dailyInfo.pulseRate,
            bloodPressure: dailyInfo.bloodPressure,
            weight: dailyInfo.weight,
            temperature: dailyInfo.temperature,
            respiratoryRate: dailyInfo.respiratoryRate,
            patient: patientID,
            created_by: created_by,
        };

        axios
            .post(`${apiUrl}dailyInfo`, data)
            .then((res) => {
                console.log(res);
                window.location.href = `${homeRoute}/home`;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChange = (e) => {
        e.persist();
        setDailyInfo({ ...dailyInfo, [e.target.name]: e.target.value });
    };
    return (
        <>
            <Jumbotron>
                <Form onSubmit={saveDailyInfo}>
                    <Form.Group>
                        <Form.Label>
                            Pulse Rate{' '}
                            {homeRoute == '/patient'
                                ? data?.pulseRate == true
                                    ? '(Required)'
                                    : '(Not Required)'
                                : null}
                        </Form.Label>
                        <Form.Control
                            type='number'
                            name='pulseRate'
                            min="0"
                            id='pulseRate'
                            placeholder='Enter pulse rate'
                            value={dailyInfo.pulseRate}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Blood Pressure{' '}
                            {homeRoute == '/patient'
                                ? data?.bloodPressure == true
                                    ? '(Required)'
                                    : '(Not Required)'
                                : null}
                        </Form.Label>
                        <Form.Control
                            type='number'
                            name='bloodPressure'
                            min="0"
                            id='bloodPressure'
                            placeholder='Enter blood pressure'
                            value={dailyInfo.bloodPressure}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Weight{' '}
                            {homeRoute == '/patient'
                                ? data?.weight == true
                                    ? '(Required)'
                                    : '(Not Required)'
                                : null}
                        </Form.Label>
                        <Form.Control
                            type='number'
                            name='weight'
                            min="0"
                            id='weight'
                            placeholder='Enter weight'
                            value={dailyInfo.weight}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Temperature{' '}
                            {homeRoute == '/patient'
                                ? data?.temperature == true
                                    ? '(Required)'
                                    : '(Not Required)'
                                : null}
                        </Form.Label>
                        <Form.Control
                            type='number'
                            name='temperature'
                            min="0"
                            id='temperature'
                            placeholder='Enter temperature'
                            value={dailyInfo.temperature}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Respiratory Rate{' '}
                            {homeRoute == '/patient'
                                ? data?.respiratoryRate == true
                                    ? '(Required)'
                                    : '(Not Required)'
                                : null}
                        </Form.Label>
                        <Form.Control
                            type='number'
                            name='respiratoryRate'
                            min="0"
                            id='respiratoryRate'
                            placeholder='Enter respiratory rate'
                            value={dailyInfo.respiratoryRate}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>
                        Create Vital Signs
                    </Button>
                </Form>
            </Jumbotron>
        </>
    );
}

export default DailyInfo;
