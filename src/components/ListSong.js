import React, {memo} from "react";
import ListSongItem from "./ListSongItem";
import icons from "../utils/icon";
import moment from "moment";

const {RiArrowUpDownFill} = icons;

const ListSong = ({song, totalDuration, total}) => {
  return (
    <div className="w-full flex flex-col text-[12px] p-[10px] ">
      <div className="flex justify-between font-semibold text-textGrey py-[10px]">
        <span className="flex flex-1 items-center gap-2">
          <span className="p-[2px] border rounded-[4px]">
            <RiArrowUpDownFill />
          </span>
          BÀI HÁT
        </span>
        <span className="flex flex-1 justify-between">
          <span>ALBUM</span>
          <span>THỜI GIAN</span>
        </span>
      </div>

      <div className="flex flex-col cursor-pointer">
        {song?.map((item) => (
          <div
            key={item.encodeId}
            className="py-[10px] border-t border-t-secondary hover:bg-third px-[10px] rounded-md"
          >
            <ListSongItem songData={item} />
          </div>
        ))}
      </div>
      <span className="py-[10px] text-textGrey border-t border-t-secondary flex gap-4">
        <span>{total} bài hát</span>
        <span>|</span>
        <span>
          {moment.utc(totalDuration * 1000).format("H")} giờ{" "}
          {moment.utc(totalDuration * 1000).format("m")} phút
        </span>
      </span>
    </div>
  );
};

export default memo(ListSong);
