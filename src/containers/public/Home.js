import React from "react";
import Slider from "../../components/Slider";
import Section from "../../components/Section";
import {useSelector} from "react-redux";
import NewRelease from "../../components/NewRelease";
import {Link} from "react-router-dom";
import ZingChart from "../../components/ZingChart";

const Home = () => {
  const {albumHot, chill, top100, artist, energy, remix, weekChart} =
    useSelector((state) => state.app);

  return (
    <div className="overflow-y-auto">
      <Slider />
      <Section data={albumHot} />
      <NewRelease />
      <Section data={chill || energy} />
      <Section data={top100} />
      <ZingChart />
      <div className="flex items-center px-[43px] w-full mt-12">
        {weekChart?.map((item) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={item.link}
            className="flex px-4"
          >
            <img
              src={item.cover}
              alt=""
              className="w-full object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
      <Section data={artist} />
      <Section data={remix || energy} />
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
