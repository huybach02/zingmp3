import React, {useEffect, useRef, useState} from "react";
import {getChartHome} from "../../api/music";
import {Line} from "react-chartjs-2";
import {Chart} from "chart.js/auto";
import SongItem from "../../components/SongItem";
import _ from "lodash";
import {useSelector} from "react-redux";
import icons from "../../utils/icon";
import LoadingData from "../../components/LoadingData";

const {BsPlayFill} = icons;

const ZingChartPage = () => {
  const [chartData, setChartData] = useState();
  const {chart, rank} = useSelector((state) => state.app);

  const [data, setData] = useState();
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
    const fetchChartData = async () => {
      const res = await getChartHome();
      if (res?.data?.err === 0) {
        setChartData(res?.data?.data);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
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
  }, [chartData]);

  return (
    <>
      {chartData?.RTChart?.items && (
        <div className="px-[59px] text-white">
          <div>
            <div className="flex items-center gap-5">
              <h1 className="py-14 text-[40px] font-bold">#zingchart</h1>
              <span className="p-1 rounded-full bg-white ">
                <BsPlayFill size={30} color="#000" />
              </span>
            </div>
            <div className="w-full cursor-default">
              <div className="w-full min-h-[300px] relative">
                {data && <Line ref={chartRef} data={data} options={options} />}
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
            <div className="mt-10 w-full flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-4 py-[10px] ">
                {chartData?.RTChart?.items.slice(0, 10).map((item, index) => (
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
          </div>
          <div className="h-[200px]"></div>
        </div>
      )}
      {!chartData?.RTChart?.items && (
        <div className="absolute top-0 bottom-[90px] left-0 right-0 bg-primary z-10 flex items-center justify-center">
          <LoadingData />
        </div>
      )}
    </>
  );
};

export default ZingChartPage;
