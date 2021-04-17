import React, { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function CheckList() {
  const [isLoading, setLoading] = useState(true);
  const [chkList, setchkList] = useState([]);
  const [symtomList, setSymtomList] = useState([]);
  const apiUrl = "http://localhost:5000/api/patient/checklist";
  const [result, setResult] = useState(null);
  useEffect(() => {
    setListData();
  }, []);

  const setListData = () => {
    axios
      .get(apiUrl)
      .then((res) => {
        setchkList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  const onSymtomChange = (e) => {
    e.persist();
    // setPatient({ ...symtomList, [e.target.name]: e.target.checked });
    let newSymtomList = symtomList;
    if (e.target.checked) {
      newSymtomList.push(e.target.id);
    } else {
      const myIndex = newSymtomList.indexOf(e.target.id);
      newSymtomList.splice(myIndex, 1);
    }

    // newSymtomList[e.target.id] = e.target.checked ? e.target.id : null;
    setSymtomList(newSymtomList);
    console.log(symtomList);
  };

  const submitDiagnose = () => {
    if (symtomList.length == 0) {
      alert("Please select symtom");
    } else {
      axios.post(apiUrl, symtomList).then((res) => {
        console.log("return data", res.data);
        setResult(res.data);
        if (res.data == null) {
          alert("No data, please try again");
        }
      });
    }
  };

  const resetResult = () => {
    setLoading(true);
    setSymtomList([]);
    setResult(null);
    setLoading(false);
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
        <>
          {result == null ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Symtom</th>
                  <th>Y/N</th>
                </tr>
              </thead>
              <tbody hover={true}>
                {/* Check box start */}
                {chkList.map((symtom, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{symtom.name}</td>
                    <td>
                      <Form.Check
                        id={symtom.index}
                        name={symtom.name}
                        defaultValue={false}
                        onClick={(e) => {
                          onSymtomChange(e);
                        }}
                      />
                    </td>
                  </tr>
                ))}
                {/* Check box end */}
              </tbody>
              <Button variant="success" onClick={submitDiagnose}>
                Submit
              </Button>
            </Table>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="card">
                <h3 className="card-header">{result.disease}</h3>
                <div className="card-body">
                  <h5 className="card-title">
                    Precautions: <em> {result.precautions.join(", ")}</em>
                  </h5>
                  <hr></hr>
                  <h5>Description</h5>
                  <p className="card-text">{result.description}</p>
                  <Button variant="success" onClick={resetResult}>
                    diagnose again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* </Jumbotron> */}
        </>
      )}
    </>
  );
}

export default CheckList;