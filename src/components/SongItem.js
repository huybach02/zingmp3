import moment from "moment";
import React, {memo} from "react";
import "moment/locale/vi";
import {useDispatch} from "react-redux";
import {play, setCurrentSongId} from "../store/action/music";

const SongItem = ({thumbnail, title, artists, releaseDate, songId}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentSongId(songId));
    dispatch(play(true));
  };

  return (
    <div
      className="w-[48%] lg:w-[30%] flex p-[10px] gap-[10px] items-center cursor-pointer hover:bg-hover rounded-md"
      onClick={handleClick}
    >
      <img src={thumbnail} alt="" className="w-[60px] h-[60px] object-cover" />
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-semibold">{title}</span>
        <span className="text-[12px] text-textGrey">{artists}</span>
        <span className="text-[12px] text-textGrey">
          {moment.unix(releaseDate).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default memo(SongItem);
