import React, { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/esm/Spinner";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function Emergency() {
  const currentUrl = window.location.pathname;
  let homeRoute = currentUrl.includes('/patient')
      ? '/patient'
      : currentUrl.includes('/nurse')
      ? '/nurse'
      : '/';

  const nurseListApi = "http://localhost:5000/api/nurses";
  const emergencyApi = "http://localhost:5000/api/patient/emergency";
  const patientId = sessionStorage.getItem("patientId");
  const patientName = sessionStorage.getItem("patientName");
  const [nurseList, setNurseList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [alertForm, setAlertForm] = useState({
    message: "",
    patient: "",
    nurse: "",
  });
  useEffect(() => {
    fetchNurseList();
  }, []);

  const fetchNurseList = () => {
    axios
      .get(nurseListApi)
      .then((res) => {
        setNurseList(res.data);
        console.log(res);
        console.log(nurseList);
        console.log(patientId);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const createEmergencyAlert = () => {
    const data = {
      name: patientName,
      message: alertForm.message,
      patient: patientId,
      nurse: alertForm.nurse,
    };
    console.log("createEmergencyAlert", data);
    axios
      .post(emergencyApi, data)
      .then((result) => {
        setLoading(false);
      window.location.href = `${homeRoute}/home`;
    }).catch((error) => setLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setAlertForm({ ...alertForm, [e.target.name]: e.target.value });
  };

  if (!isUserAuthenticated()) {
    return <Redirect to="/patient" />;
  }
  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Jumbotron>
          <Form onSubmit={createEmergencyAlert}>
            <Form.Group></Form.Group>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                name="message"
                id="message"
                placeholder="Tip Content"
                value={alertForm.message}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nurse Receiver</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="nurse"
                id="nurse"
                value={alertForm.nurse}
                onChange={onChange}
              >
                <option value="" disabled={true}>
                  -- Choose one --
                </option>
                {nurseList.map((nurse, key) => {
                  return (
                    <option key={key} value={nurse.id}>
                      {nurse.fullName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit">
              Send Emergency Alert
            </Button>
          </Form>
        </Jumbotron>
      )}
    </>
  );
}

export default Emergency;
