import React, {memo} from "react";
import {Audio} from "react-loader-spinner";

const AudioLoading = () => {
  return (
    <div>
      <Audio
        height="20"
        width="20"
        color="#fff"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};

export default memo(AudioLoading);
