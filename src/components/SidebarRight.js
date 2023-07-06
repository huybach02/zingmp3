import React, {useEffect, useState} from "react";
import icons from "../utils/icon";
import {useSelector} from "react-redux";
import SongItem from "./SongItem";
import {useNavigate} from "react-router-dom";
import {getDetailPlaylist} from "../api/music";
import {Scrollbars} from "react-custom-scrollbars-2";

const {ImBin} = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState();
  const {
    currentSongData,
    currentAlbumId,
    recentSongs,
    isPlaying,
    currentSongId,
  } = useSelector((state) => state.music);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const res = await getDetailPlaylist(currentAlbumId);
      if (res?.data?.err === 0) {
        setPlaylist(res?.data?.data?.song?.items);
      }
    };

    if (currentAlbumId) fetchDetailPlayList();
  }, [currentAlbumId]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, currentSongId]);

  return (
    <div className="flex flex-col text-white text-[12px]">
      <div className="h-[70px] gap-8 flex-none px-3 py-[14px] flex items-center justify-between">
        <div className="flex flex-auto gap-5 justify-center bg-bgIcon py-1 rounded-r-full rounded-l-full cursor-pointer items-center">
          <span
            className={`${
              !isRecent &&
              "py-1 px-3 rounded-r-full rounded-l-full  bg-progress"
            }`}
            onClick={() => setIsRecent(false)}
          >
            Danh sách phát
          </span>
          <span
            className={`${
              isRecent && "py-1 px-3 rounded-r-full rounded-l-full  bg-progress"
            }`}
            onClick={() => setIsRecent(true)}
          >
            Nghe gần đây
          </span>
        </div>
        <span
          title="Xóa tất cả"
          className="p-3 rounded-full bg-bgIcon cursor-pointer hover:scale-105"
        >
          <ImBin size={14} />
        </span>
      </div>

      {!isRecent && (
        <div className="w-full flex flex-col flex-none">
          <SongItem
            thumbnail={currentSongData?.thumbnail}
            title={`${
              currentSongData?.title?.length > 40
                ? `${currentSongData?.title?.slice(0, 20)}...`
                : currentSongData?.title
            }`}
            artists={currentSongData?.artistsNames}
            songId={currentSongData?.encodeId}
            order
          />
          <div className="flex flex-col text-[14px] p-4">
            <span className="text-textGrey">
              Từ playList{" "}
              <span
                className="text-select font-semibold cursor-pointer"
                onClick={() =>
                  navigate(currentSongData?.album?.link?.split(".")[0])
                }
              >
                {currentSongData?.album?.title}
              </span>
            </span>
            <span className="font-bold mt-2">Dành cho bạn</span>
          </div>
          <div className=" h-custom">
            <Scrollbars style={{width: "100%", height: "100%"}}>
              {playlist && (
                <div className="flex flex-col">
                  {playlist
                    ?.filter(
                      (item) => item.encodeId !== currentSongData?.encodeId
                    )
                    ?.map((item) => (
                      <SongItem
                        key={item.encodeId}
                        thumbnail={item?.thumbnail}
                        title={item?.title}
                        artists={item?.artistsNames}
                        songId={item?.encodeId}
                      />
                    ))}
                </div>
              )}
            </Scrollbars>
          </div>
        </div>
      )}

      {isRecent && (
        <div>
          <div className=" h-custom2">
            <Scrollbars style={{width: "100%", height: "100%"}}>
              {recentSongs && (
                <div className="flex flex-col">
                  {recentSongs?.map((item) => (
                    <SongItem
                      key={item.songId}
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artists}
                      songId={item?.songId}
                    />
                  ))}
                </div>
              )}
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarRight;
