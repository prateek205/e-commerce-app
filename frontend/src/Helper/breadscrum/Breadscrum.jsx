import React from 'react'
import { useLocation } from "react-router-dom";

const Breadscrum = () => {
  const location = useLocation();

  console.log(location);

  return (
    <React.Fragment>
        <h1>Braeadscrum</h1>
    </React.Fragment>
  );
};

export default Breadscrum;
