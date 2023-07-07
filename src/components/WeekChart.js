import React, {useEffect, useState} from "react";
import {useParams, NavLink} from "react-router-dom";
import icons from "../utils/icon";
import {getChartHome} from "../api/music";
import SongItem from "./SongItem";
import LoadingData from "./LoadingData";

const {BsPlayFill} = icons;

const WeekChart = () => {
  const {id} = useParams();
  console.log("id: ", id);
  const [chartData, setChartData] = useState();
  const [index, setIndex] = useState(0);
  console.log("chartData: ", chartData);

  useEffect(() => {
    console.log(id);
  }, [id]);

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await getChartHome();
      if (res?.data?.err === 0) {
        setChartData(Object.values(res?.data?.data?.weekChart));
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="px-[59px] text-white">
      <div className="flex items-center gap-5">
        <h1 className="py-10 text-[40px] font-bold">Bảng Xếp Hạng Tuần</h1>
        <span className="p-1 rounded-full bg-select ">
          <BsPlayFill size={30} color="#fff" />
        </span>
      </div>
      <div className="flex items-center text-[24px] uppercase font-bold text-textGrey">
        {chartData?.map((item) => (
          <div
            key={item.country}
            className="pr-10 hover:text-white cursor-pointer"
          >
            <NavLink
              to={item.link.split(".")[0]}
              className={({isActive}) =>
                isActive ? "text-white border-b-4 pb-2 border-select" : ""
              }
            >
              {(item.country === "vn" && "VIỆT NAM") ||
                (item.country === "us" && "US-UK") ||
                (item.country === "korea" && "K-POP")}
            </NavLink>
          </div>
        ))}
      </div>
      <>
        {chartData?.find((item) => item?.link?.includes(id))?.items && (
          <div className="mt-10 w-full flex flex-col items-center gap-2">
            <div className="w-full flex flex-col gap-4 py-[10px] ">
              {chartData &&
                chartData
                  ?.find((item) => item?.link?.includes(id))
                  ?.items?.map((item, index) => (
                    <SongItem
                      key={item.encodeId}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      artists={item.artistsNames}
                      songId={item.encodeId}
                      order={index + 1}
                      titleFull
                    />
                  ))}
            </div>
          </div>
        )}
        {!chartData?.find((item) => item?.link?.includes(id))?.items && (
          <div className="absolute top-0 bottom-[90px] left-0 right-0 bg-primary z-10 flex items-center justify-center">
            <LoadingData />
          </div>
        )}
      </>
    </div>
  );
};

export default WeekChart;
