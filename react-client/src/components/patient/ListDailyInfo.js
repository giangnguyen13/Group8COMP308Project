import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';
import { apiUrl } from "../../Helper";


function ListDailyInfo(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);

    const patientID = props.match.params.patientId;

    useEffect(() => {
        const fetchData = async () => {
            axios
                .get(apiUrl + `nurse/listAllDailyInfoById/${patientID}`)
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

    const enterVitalSigns = () => {
        props.history.push({
            pathname: 'nurse/dailyInfo/'+patientID,
        });
    };
    
    return (
        <div>
            {showLoading && (
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </Spinner>
            )}
            <div class="text-center">
                <button class="btn btn-success" type="submit" onClick={() => { enterVitalSigns()}}>Enter Today's Vital Signs</button>
                <br></br>
                <br></br>
                {data.map((item, idx) => (
                    <div class="text-center font-weight-bold">
                        <div>{'Blood Pressure: ' + item.bloodPressure}</div>
                        <div>{'Pulse Rate: ' + item.pulseRate}</div>
                        <div>{'Weight: ' + item.weight}</div>
                        <div>{'Temperature: ' + item.temperature}</div>
                        <div>{'Respiratory Rate: ' + item.respiratoryRate}</div>
                        <div>{'Created: ' + item.created}</div>
                        <br></br>
                    </div>                        
                ))}
            </div>
        </div>
    );
}

export default withRouter(ListDailyInfo);

