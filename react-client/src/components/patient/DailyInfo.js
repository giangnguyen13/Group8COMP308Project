import React, { useState } from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiUrl } from "../../Helper";

function DailyInfo() {
  
  const patientID = sessionStorage.getItem("patientId");
  const created_by = sessionStorage.getItem("created_by");

  const [dailyInfo, setDailyInfo] = useState({
    pulseRate: "",
    bloodPressure: "",
    weight: "",
    temperature: "",
    respiratoryRate: "",
  });

  const saveDailyInfo = () => {
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
      .post(`${apiUrl}dailyInfo`, data)
      .then((res) => {
        console.log(res);
        window.location.href = "/";
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
            <Form.Label>Pulse Rate</Form.Label>
            <Form.Control
              type="number"
              name="pulseRate"
              id="pulseRate"
              placeholder="Enter pulse rate"
              value={dailyInfo.pulseRate}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Blood Pressure</Form.Label>
            <Form.Control
              type="number"
              name="bloodPressure"
              id="bloodPressure"
              placeholder="Enter blood pressure"
              value={dailyInfo.bloodPressure}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              id="weight"
              placeholder="Enter weight"
              value={dailyInfo.weight}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>temperature</Form.Label>
            <Form.Control
              type="number"
              name="temperature"
              id="temperature"
              placeholder="Enter temperature"
              value={dailyInfo.temperature}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Respiratory Rate</Form.Label>
            <Form.Control
              type="number"
              name="respiratoryRate"
              id="respiratoryRate"
              placeholder="Enter respiratory rate"
              value={dailyInfo.respiratoryRate}
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Create patient
          </Button>
        </Form>
      </Jumbotron>
    </>
  );
}

export default DailyInfo;
