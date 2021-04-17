import React, { useState } from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiUrl } from "../../Helper";

function RequiredVitalSigns() {
  
  const currentUrl = window.location.pathname;
  let homeRoute = currentUrl.includes("/patient")
  ? "/patient"
  : currentUrl.includes("/nurse")
  ? "/nurse"
  : "/";

  const checkboxState = {
    isTrue: true,
    isFalse: false
  };

  const patientID = sessionStorage.getItem("patientId");
  const created_by = sessionStorage.getItem("created_by");

  const [dailyInfo, setDailyInfo] = useState({
    pulseRate: false,
    bloodPressure: false,
    weight: false,
    temperature: false,
    respiratoryRate: false
  });

  const saveRequiredVitalSigns = () => {
    const data = {
      pulseRate: dailyInfo.pulseRate,
      bloodPressure: dailyInfo.bloodPressure,
      weight: dailyInfo.weight,
      temperature: dailyInfo.temperature,
      respiratoryRate: dailyInfo.respiratoryRate,
      patient: patientID,
      created_by: created_by
    };

    axios
      .post(`${apiUrl}nurse/requiredVitalSigns`, data)
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
        <Form onSubmit={saveRequiredVitalSigns}>
          <Form.Group>
            <Form.Label>Pulse Rate</Form.Label>
            <Form.Control
              type="checkbox"
              name="pulseRate"
              id="pulseRate"
              placeholder="Enter pulse rate"
              value={checkboxState.isTrue}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Blood Pressure</Form.Label>
            <Form.Control
              type="checkbox"
              name="bloodPressure"
              id="bloodPressure"
              value={checkboxState.isTrue}
              placeholder="Enter blood pressure"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="checkbox"
              name="weight"
              id="weight"
              value={checkboxState.isTrue}
              placeholder="Enter weight"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Temperature</Form.Label>
            <Form.Control
              type="checkbox"
              name="temperature"
              id="temperature"
              value={checkboxState.isTrue}
              placeholder="Enter temperature"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Respiratory Rate</Form.Label>
            <Form.Control
              type="checkbox"
              name="respiratoryRate"
              id="respiratoryRate"
              value={checkboxState.isTrue}
              placeholder="Enter respiratory rate"
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Create Required Vital Signs
          </Button>
        </Form>
      </Jumbotron>
    </>
  );
}

export default RequiredVitalSigns;
