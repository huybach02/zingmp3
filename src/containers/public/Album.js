import React, {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import {getDetailPlaylist} from "../../api/music";
import moment from "moment";
import ListSong from "../../components/ListSong";
import {Scrollbars} from "react-custom-scrollbars-2";
import {useDispatch, useSelector} from "react-redux";
import {
  play,
  setCurrentAlbumId,
  setCurrentSongId,
  setLoading,
  setPlaylist,
} from "../../store/action/music";
import icons from "../../utils/icon";
import AudioLoading from "../../components/AudioLoading";
import LoadingData from "../../components/LoadingData";

const {BsPlayCircle} = icons;

const Album = () => {
  const {isPlaying} = useSelector((state) => state.music);
  const {isLoading} = useSelector((state) => state.app);
  const {id} = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setCurrentAlbumId(id));
    const fetchDetailPlaylist = async () => {
      dispatch(setLoading(true));
      const res = await getDetailPlaylist(id);
      dispatch(setLoading(false));
      if (res?.data.err === 0) {
        setPlaylistData(res.data?.data);
        dispatch(setPlaylist(res?.data?.data?.song?.items));
      }
    };

    fetchDetailPlaylist();
  }, [id]);

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong = Math.round(
        Math.random() * (playlistData?.song?.items?.length - 1)
      );
      dispatch(
        setCurrentSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(play(true));
    }
  }, [id, playlistData]);

  return (
    <div className="flex relative gap-8 w-full h-[80%] px-[59px] pt-[20px]">
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary z-10 flex items-center justify-center">
          <LoadingData />
        </div>
      )}
      <div className="flex-none w-[25%] text-textWhite flex flex-col items-center ">
        <div className="w-[300px] relative cursor-pointer overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt=""
            className={`w-full object-contain shadow-md  ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            }`}
          />
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-40% flex items-center justify-center ${
              isPlaying && "rounded-full"
            }`}
          >
            <span>
              {isPlaying ? (
                <div className="p-3 border-2 border-white rounded-full">
                  <AudioLoading />
                </div>
              ) : (
                <BsPlayCircle size={50} />
              )}
            </span>
          </div>
        </div>
        <h3 className="text-[20px] font-bold mt-3">{playlistData?.title}</h3>
        <span className="text-textGrey text-[12px] flex flex-col items-center gap-1 mt-1">
          <span>
            Cập nhật:{" "}
            {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}
          </span>
          <span>{playlistData?.artistsNames}</span>
          <span>{`${Math.floor(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </span>
      </div>

      <div className="flex-auto text-textWhite mb-10">
        <Scrollbars style={{width: "100%", height: "100%"}}>
          <span className="text-[14px]">
            <span>
              <span className="text-textGrey">Lời tựa:</span>{" "}
              {playlistData.sortDescription}
            </span>
          </span>
          <ListSong
            totalDuration={playlistData?.song?.totalDuration}
            total={playlistData?.song?.total}
          />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Album;
