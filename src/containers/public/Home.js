import React from "react";
import {Header} from "../../components";
import Slider from "../../components/Slider";

const Home = () => {
  return (
    <div className="overflow-y-auto">
      <div className="h-[70px] bg-primary px-[59px] flex items-center">
        <Header />
      </div>
      <Slider />
    </div>
  );
};

export default Home;
