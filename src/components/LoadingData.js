import React from "react";
import {RotatingSquare} from "react-loader-spinner";

const LoadingData = () => {
  return (
    <div>
      <RotatingSquare
        height="100"
        width="100"
        color="#9b4de0"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingData;
