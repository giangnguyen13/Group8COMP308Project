import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter, Redirect } from 'react-router-dom';
import { apiUrl } from "../../Helper";

function ListDailyInfo(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);
    
    const currentUrl = window.location.pathname;
    let homeRoute = currentUrl.includes("/patient")
    ? "/patient"
    : currentUrl.includes("/nurse")
    ? "/nurse"
    : "/";

    const patientID = props.match.params.patientId;

    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(apiUrl + `listAllDailyInfoById/${patientID}`)
                .then((result) => {
                    console.log('result.data:', result.data);
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
    
    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <div className="text-center">
                <a className="btn btn-success" href={`${homeRoute}/dailyInfo`}>Enter Today's Vital Signs</a> 
                <br></br>
                <br></br>
                {data.map((item, idx) => (
                    <div class="text-center font-weight-bold">
                        <div>{'Blood Pressure: ' + item.bloodPressure}</div>
                        <div>{'Pulse Rate: ' + item.pulseRate}</div>
                        <div>{'Weight: ' + item.weight}</div>
                        <div>{'Temperature: ' + item.temperature}</div>
                        <div>{'Respiratory Rate: ' + item.respiratoryRate}</div>
                        <div>{'Created By ' + item.created_by}</div>
                        <div>{'Created: ' + item.created}</div>
                        <br></br>
                    </div>                        
                ))}
            </div>
        </div>
    );
}

export default withRouter(ListDailyInfo);

