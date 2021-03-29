import React from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";

function CheckList() {
  return (
    <>
      {isUserAuthenticated() ? (
        <div className="App">CheckList</div>
      ) : (
        <Redirect to="/patient" />
      )}
    </>
  );
}

export default CheckList;
