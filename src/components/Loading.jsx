import React from "react";
import "./load.css"

const Loading = ({ show }) => {
  return (
    show && (
      <>
        <div className="lds-default" style={{textAlign: "center"}}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h5>Loading...</h5>
      </>
    )
  );
};

export default Loading;
