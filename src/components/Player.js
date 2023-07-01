import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetailSong, getSong} from "../api/music";
import icons from "../utils/icon";
import {play} from "../store/action/music";

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  PiShuffle,
  AiFillStepForward,
  AiFillStepBackward,
  BsPlayCircle,
  PiRepeatFill,
  BsPauseCircle,
} = icons;

const Player = () => {
  const {currentSongId, isPlaying} = useSelector((state) => state.music);
  console.log("isPlaying: ", isPlaying);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const audioElement = useRef(new Audio());

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        getDetailSong(currentSongId),
        getSong(currentSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1?.data?.data);
      }
      if (res2.data.err === 0) {
        setSource(res2?.data?.data["128"]);
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  useEffect(() => {
    audioElement.current.pause();
    audioElement.current.src = source;
    audioElement.current.load();
    if (isPlaying) {
      audioElement.current.play();
    }
  }, [currentSongId, source, audioElement, isPlaying]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audioElement.current.pause();
      dispatch(play(false));
    } else {
      audioElement.current.play();
      dispatch(play(true));
    }
  };

  return (
    <div className="px-5 h-full flex text-white py-2">
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

      <div className="w-[40%] flex-auto flex flex-col items-center justify-center gap-2">
        <div className="flex gap-8 justify-center items-center cursor-pointer">
          <span
            title="Bật phát ngẫu nhiên"
            className="p-2 rounded-full hover:bg-[#282230]"
          >
            <PiShuffle size={22} />
          </span>
          <span className="p-2 rounded-full hover:bg-[#282230]">
            <AiFillStepBackward size={22} />
          </span>
          <span className="hover:text-select" onClick={handleTogglePlayMusic}>
            {isPlaying ? (
              <BsPauseCircle size={40} />
            ) : (
              <BsPlayCircle size={40} />
            )}
          </span>
          <span className="p-2 rounded-full hover:bg-[#282230]">
            <AiFillStepForward size={22} />
          </span>
          <span
            title="Bật phát lại tất cả"
            className="p-2 rounded-full hover:bg-[#282230]"
          >
            <PiRepeatFill size={22} />
          </span>
        </div>

        <div>progress</div>
      </div>

      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
