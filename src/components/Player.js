import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetailSong, getSong} from "../api/music";
import icons from "../utils/icon";
import {play, setCurrentSongId} from "../store/action/music";
import moment from "moment";
import {toast} from "react-toastify";

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

var intervalId;

const Player = () => {
  const {currentSongId, isPlaying, songs} = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  console.log("songInfo: ", songInfo);
  const [audio, setAudio] = useState(new Audio());
  const [current, setCurrent] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const thumbRef = useRef();
  const trackRef = useRef();

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
        if (songInfo?.streamingStatus === 1) {
          audio.pause();
        }
        setAudio(new Audio(res2?.data?.data["128"]));
      } else {
        dispatch(play(false));
        audio.pause();
        setAudio(new Audio());
        toast.warn(res2?.data.msg);
        setCurrent(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime / songInfo?.duration) * 10000) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrent(Math.round(audio.currentTime));
      }, 200);
    }
  }, [isPlaying]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime / songInfo?.duration) * 10000) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrent(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(play(false));
    } else {
      audio.play();
      dispatch(play(true));
    }
  };

  const handleProgress = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent = Math.round(
      ((e.clientX - trackRect.left) * 10000) / trackRect.width / 100
    );
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo?.duration) / 100;
    setCurrent(Math.round((percent * songInfo?.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) currentSongIndex = index;
      });
      dispatch(setCurrentSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) currentSongIndex = index;
      });
      dispatch(setCurrentSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(play(true));
    }
  };

  const handleShuffle = () => {};

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
            className={`p-2 rounded-full hover:bg-[#282230] ${
              !isShuffle ? "text-textGrey font-bold" : ""
            }`}
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <PiShuffle size={22} />
          </span>
          <span
            className={`${
              !songs
                ? "text-textGrey cursor-default"
                : "p-2 rounded-full hover:bg-[#282230]"
            }`}
            onClick={handlePrevSong}
          >
            <AiFillStepBackward size={22} />
          </span>
          <span className="hover:text-select" onClick={handleTogglePlayMusic}>
            {isPlaying ? (
              <BsPauseCircle size={38} />
            ) : (
              <BsPlayCircle size={38} />
            )}
          </span>
          <span
            className={`${
              !songs
                ? "text-textGrey cursor-default"
                : "p-2 rounded-full hover:bg-[#282230]"
            }`}
            onClick={handleNextSong}
          >
            <AiFillStepForward size={22} />
          </span>
          <span
            title="Bật phát lại tất cả"
            className="p-2 rounded-full hover:bg-[#282230]"
          >
            <PiRepeatFill size={22} />
          </span>
        </div>

        <div className="w-full flex items-center justify-around">
          <span className="text-[12px]">
            {moment.utc(current * 1000).format("mm:ss")}
          </span>
          <div
            ref={trackRef}
            className="w-4/5 h-[3px] hover:h-[6px] cursor-pointer bg-progress relative rounded-lg"
            onClick={handleProgress}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0 bg-white rounded-lg transition-all"
            ></div>
          </div>
          <span className="text-[12px]">
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>

      <div className="w-[30%] flex-auto">Volume</div>
    </div>
  );
};

export default Player;
