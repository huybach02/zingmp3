import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SongItem from "./SongItem";

const NewRelease = () => {
  const {newRelease} = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState("all");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (isActive === "all") {
      setList(newRelease?.items?.all);
    } else if (isActive === "vPop") {
      setList(newRelease?.items?.vPop);
    } else {
      setList(newRelease?.items?.others);
    }
  }, [isActive, newRelease]);

  return (
    <div className="mt-[48px] px-[59px] text-textWhite flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-semibold">{newRelease?.title}</h3>
        {newRelease?.title && <span>tat ca</span>}
      </div>
      {newRelease?.title && (
        <div className="flex items-center gap-5">
          <button
            type="button"
            className={`py-1 px-6 rounded-l-full rounded-r-full border border-textGrey text-[12px] uppercase hover:text-textGrey ${
              isActive === "all" && "bg-select"
            }`}
            onClick={() => setIsActive("all")}
          >
            tất cả
          </button>
          <button
            type="button"
            className={`py-1 px-6 rounded-l-full rounded-r-full border border-textGrey text-[12px] uppercase hover:text-textGrey ${
              isActive === "vPop" && "bg-select"
            }`}
            onClick={() => setIsActive("vPop")}
          >
            việt nam
          </button>
          <button
            type="button"
            className={`py-1 px-6 rounded-l-full rounded-r-full border border-textGrey text-[12px] uppercase hover:text-textGrey ${
              isActive === "others" && "bg-select"
            }`}
            onClick={() => setIsActive("others")}
          >
            quốc tế
          </button>
        </div>
      )}

      <div className="flex flex-wrap w-full gap-x-5 ">
        {list?.map((item) => (
          <div
            key={item.encodeId}
            className="w-[48%] lg:w-[30%] hover:bg-hover rounded-md"
          >
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
              songId={item.encodeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
