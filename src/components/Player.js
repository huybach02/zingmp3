import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getDetailSong} from "../api/music";
import icons from "../utils/icon";

const {AiFillHeart, AiOutlineHeart, BsThreeDots} = icons;

const Player = () => {
  const {currentSongId} = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const res = await getDetailSong(currentSongId);
      console.log("res: ", res);
      if (res.data.err === 0) {
        setSongInfo(res.data.data);
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  return (
    <div className="px-5 h-full flex text-white">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt=""
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col ">
          <span className="text-[13px] font-semibold">{songInfo?.title}</span>
          <span className="text-[12px] font-semibold text-textGrey">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div>
          <span>
            <AiOutlineHeart size={16} />
          </span>
        </div>
        <div>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>

      <div className="w-[40%] flex-auto">Main Player</div>

      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
