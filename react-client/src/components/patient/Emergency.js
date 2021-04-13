import React, { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/esm/Spinner";
import axios from "axios";

function Emergency() {
  const nurseApiUrl = "http://localhost:5000/api/nurses";

  const [nurseList, setNurseList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchNurseList();
  }, []);

  const fetchNurseList = () => {
    axios
      .get(nurseApiUrl)
      .then((res) => {
        setNurseList(res.data);
        console.log(res);
        console.log(nurseList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
        <ListGroup>
          {nurseList.map((nurse, idx) => (
            <ListGroup.Item key={idx} action onClick={() => {}}>
              {nurse.fullName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default Emergency;
