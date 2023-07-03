import React from "react";
import Slider from "../../components/Slider";
import Section from "../../components/Section";
import {useSelector} from "react-redux";

const Home = () => {
  const {albumHot, chill, top100, artist, energy, remix} = useSelector(
    (state) => state.app
  );

  return (
    <div className="overflow-y-auto">
      <Slider />
      <Section data={albumHot} />
      <Section data={chill || energy} />
      <Section data={top100} />
      <Section data={artist} />
      <Section data={remix || energy} />
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
