import React, {useEffect, useRef, useState} from "react";
import {Line} from "react-chartjs-2";
import {Chart} from "chart.js/auto";
import {useSelector} from "react-redux";
import SongItem from "./SongItem";
import icons from "../utils/icon";
import _ from "lodash";

const {BsPlayFill} = icons;

const ZingChart = () => {
  const [data, setData] = useState(null);
  const {chart, rank} = useSelector((state) => state.app);
  const chartRef = useRef();
  const [tooltip, setTooltip] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {display: false},
        grid: {color: "rgba(255,255,255,0.1)", drawTicks: false},
        min: chart?.minScore,
        max: chart?.maxScore,
        border: {dash: [2, 5]},
      },
      x: {
        ticks: {color: "white"},
        grid: {color: "transparent"},
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: (ctx) => {
          const tooltipModel = ctx.tooltip;
          if (tooltipModel.opacity === 0) {
            if (tooltip.opacity !== 0)
              setTooltip((prev) => ({...prev, opacity: 0}));
            return;
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          const rs = counters.find((i) =>
            i.data.some(
              (n) => n === +tooltipModel.body[0].lines[0].replace(".", "")
            )
          )?.encodeId;
          setSelected(rs);
          const newTooltipData = {
            opacity: 1,
            left: tooltipModel.caretX,
            top: tooltipModel.caretY,
          };
          if (!_.isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
    }
    setData({labels, datasets});
  }, [chart]);

  return (
    <div>
      {data && data.labels && (
        <div className="px-[59px] mt-12 text-white ">
          <div className="w-full px-5 py-6 rounded-lg bg-gradient-to-r from-[#3e175a] to-[#59247c]">
            <div className="flex gap-5 items-center mb-5">
              <h3 className="text-[28px] font-bold ">#zingchart</h3>
              <span className="p-1 rounded-full bg-white ">
                <BsPlayFill size={20} color="#000" />
              </span>
            </div>
            <div className="flex sm:flex-col-reverse lg:flex-row gap-4">
              <div className="sm:w-full lg:w-[35%]">
                <div className="w-full flex flex-col gap-4 py-[10px] ">
                  {rank?.slice(0, 3)?.map((item, index) => (
                    <SongItem
                      key={item.encodeId}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      artists={item.artistsNames}
                      songId={item.encodeId}
                      order={index + 1}
                      percent={Math.round(
                        (+item.score * 100) / +chart?.totalScore
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="sm:w-full lg:w-[65%] cursor-default">
                <div className="w-full min-h-[300px] relative">
                  {data && (
                    <Line ref={chartRef} data={data} options={options} />
                  )}
                  <div
                    className="tooltip"
                    style={{
                      top: tooltip.top,
                      left: tooltip.left,
                      position: "absolute",
                      opacity: tooltip.opacity,
                    }}
                  >
                    <SongItem
                      thumbnail={
                        rank?.find((i) => i.encodeId === selected)?.thumbnail
                      }
                      title={rank?.find((i) => i.encodeId === selected)?.title}
                      artists={
                        rank?.find((i) => i.encodeId === selected)?.artistsNames
                      }
                      sid={rank?.find((i) => i.encodeId === selected)?.encodeId}
                      styleChart={
                        "w-[150px] bg-white p-1 flex items-center text-black text-[10px]"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZingChart;
