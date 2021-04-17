import React, { useState, useEffect } from "react";
import { isUserAuthenticated } from "../../Helper";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";

function EmergencyAlarm() {
  const emergencyListApiUrl = "http://localhost:5000/api/nurse/emergency/";
  const [isLoading, setLoading] = useState(true);
  const [emergencyList, setEmergencyList] = useState([]);
  const nurseId = sessionStorage.getItem("nurseId");
  useEffect(() => {
    fetchEmergencyList();
  }, []);

  const fetchEmergencyList = () => {
    axios.get(emergencyListApiUrl + nurseId).then((res) => {
      console.log(res.data);
      setEmergencyList(res.data);
      setLoading(false);
    });
  };

  if (!isUserAuthenticated()) {
    return <Redirect to="/nurse" />;
  }
  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <><h1>Emergency Message List</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Message</th>
              <th>Patient Name</th>
              <th>Created </th>
            </tr>
          </thead>
          <tbody hover={true}>
            {/* Check box start */}
            {emergencyList.map((emergencyItem, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{emergencyItem.message}</td>
                <td>{emergencyItem.name}</td>
                <td>{emergencyItem.created}</td>
              </tr>
            ))}
            {/* Check box end */}
          </tbody>
        </Table>
        </>
      )}
    </>
  );
}

export default EmergencyAlarm;
