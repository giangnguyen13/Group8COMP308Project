import React, { useState, useEffect } from 'react';
import { isUserAuthenticated } from '../../Helper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertDismissible from '../AlertDismissible';

function PatientHomePage() {
    const [tipList, setTipList] = useState([]);
    const patientName = sessionStorage.getItem('patientName');
    useEffect(() => {
        if (patientName) {
            const apiUrl = `http://localhost:5000/api/nurse/tip?patientname=${patientName.replaceAll(
                ' ',
                '%20'
            )}`;
            axios
                .get(apiUrl)
                .then((result) => {
                    setTipList(result.data);
                })
                .catch((error) => console.log('error'));
        } else {
            const apiUrl = `http://localhost:5000/api/nurse/tip`;
            axios
                .get(apiUrl)
                .then((result) => {
                    setTipList(result.data);
                })
                .catch((error) => console.log('error'));
        }
    }, []);
    return (
        <>
            {isUserAuthenticated() ? (
                <div className='container App'>
                    {tipList.map((tip, key) => {
                        const { title, content, sender } = tip;
                        return (
                            <div
                                className='row justify-content-center'
                                style={{ marginBottom: '5px' }}
                                key={key}
                            >
                                <AlertDismissible
                                    heading={title}
                                    content={content}
                                    sender={sender}
                                    id={key + 1}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Redirect to='/patient' />
            )}
        </>
    );
}

export default PatientHomePage;
