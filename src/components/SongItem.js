import moment from "moment";
import React, {memo} from "react";
import "moment/locale/vi";
import {useDispatch} from "react-redux";
import {play, setCurrentSongId, setRecentSong} from "../store/action/music";

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  songId,
  order,
  percent,
  styleChart,
  streamingStatus,
  titleFull,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentSongId(songId));
    dispatch(play(true));
    dispatch(
      setRecentSong({
        thumbnail,
        title,
        artists,
        songId,
      })
    );
  };

  return (
    <div
      className={`${
        styleChart
          ? styleChart
          : `w-full flex p-[10px] gap-[10px] items-center cursor-pointer  justify-between text-[14px] rounded-lg ${
              order <= 3
                ? "hover:bg-[#5f4274] bg-[#51296d] border-l-8 border-select  "
                : ""
            }`
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-5">
        {order && (
          <span
            className={`text-[32px] font-bold ${
              order === 1
                ? "text-[#4a90e2]"
                : order === 2
                ? "text-[#50e3c2]"
                : order === 3
                ? "text-[#e35050]"
                : "text-white"
            }`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt=""
          className={`${
            styleChart
              ? "w-[40px] h-[40px] object-cover"
              : "w-[60px] h-[60px] object-cover"
          }`}
        />
        <div className="flex flex-col gap-1">
          <span className=" font-semibold flex items-center gap-3">
            <span>{`${
              !titleFull && title?.length > 24
                ? `${title?.slice(0, 24)}...`
                : title
            }`}</span>
            <span>
              {streamingStatus === 2 && (
                <span className="bg-premium px-2 py-0 rounded-md text-[10px] font-bold">
                  PREMIUM
                </span>
              )}
            </span>
          </span>
          <span
            className={`${
              styleChart
                ? "text-[8px] text-textGrey"
                : "text-[12px] text-textGrey"
            }`}
          >
            {artists}
          </span>
          <span className="text-[12px] text-textGrey">
            {releaseDate && moment.unix(releaseDate).fromNow()}
          </span>
        </div>
      </div>
      {percent && <span className="font-bold">{percent}%</span>}
    </div>
  );
};

export default memo(SongItem);
