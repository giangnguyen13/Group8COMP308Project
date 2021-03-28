import React from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";

function Emergency() {
  return (
    <>
      {isUserAuthenticated() ? (
        <div className="App">This is Emergency route for patient</div>
      ) : (
        <Redirect to="/patient" />
      )}
    </>
  );
}

export default Emergency;
