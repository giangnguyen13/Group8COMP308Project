import React from "react";
import { isUserAuthenticated } from "../../Helper";
import { Redirect } from "react-router-dom";
import CreateTip from "./CreateTip";
import EmergencyAlarm from "./EmergencyAlarm";

function NurseHomePage() {
  return (
    <>
      {isUserAuthenticated() ? (
        <div className="App">
          <EmergencyAlarm />
        </div>
      ) : (
        <Redirect to="/nurse" />
      )}
    </>
  );
}

export default NurseHomePage;
