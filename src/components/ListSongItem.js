import React, {memo} from "react";
import icons from "../utils/icon";
import moment from "moment";
import {useDispatch} from "react-redux";
import {
  play,
  playAlbum,
  setCurrentSongId,
  setRecentSong,
} from "../store/action/music";

const {BsMusicNoteBeamed} = icons;

const ListSongItem = ({songData, isHideAlbum}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentSongId(songData.encodeId));
    dispatch(play(true));
    dispatch(playAlbum(true));
    dispatch(
      setRecentSong({
        thumbnail: songData?.thumbnail,
        title: songData?.title,
        artists: songData?.artistsNames,
        songId: songData?.encodeId,
      })
    );
  };

  return (
    <div className="flex justify-between items-center" onClick={handleClick}>
      <div className="flex items-center gap-2 flex-1">
        {!isHideAlbum && (
          <span>
            <BsMusicNoteBeamed />
          </span>
        )}
        <img
          src={songData?.thumbnail}
          alt=""
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col gap-1 w-full">
          <span className="flex gap-3 items-center">
            <span className="text-[14px]">{`${
              songData?.title?.length > 28
                ? `${songData?.title?.slice(0, 28)}...`
                : songData?.title
            }`}</span>
            {songData.streamingStatus === 2 && (
              <span className="bg-premium px-2 py-0 rounded-md text-[10px] font-bold">
                PREMIUM
              </span>
            )}
          </span>
          <span className="text-[12px] text-textGrey">
            {songData.artistsNames}
          </span>
        </span>
      </div>

      <div className="flex items-center justify-center flex-1">
        {!isHideAlbum && (
          <div className="flex items-center text-textGrey">{`${
            songData?.album?.title.length > 40
              ? `${songData?.album?.title?.slice(0, 40)}...`
              : songData?.album?.title
          }`}</div>
        )}
        <div className="flex items-center justify-end flex-1 text-textGrey text-[12px]">
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </div>
      </div>
    </div>
  );
};

export default memo(ListSongItem);
