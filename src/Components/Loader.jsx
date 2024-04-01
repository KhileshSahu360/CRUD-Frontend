import React from "react";
import { CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";

const Loader = ({ loading }) => {
  return (
    
      <ClockLoader
        color={"white"}
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
   
  );
};

export default Loader;
