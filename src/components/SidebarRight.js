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
  const {currentSongData, currentAlbumId} = useSelector((state) => state.music);
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
      <div className="w-full flex flex-col flex-auto">
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
          <span className="font-bold">Tiếp theo</span>
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
        </div>
        <Scrollbars style={{width: "100%", height: "650px"}}>
          {playlist && (
            <div className="flex flex-col">
              {playlist
                ?.filter((item) => item.encodeId !== currentSongData?.encodeId)
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
  );
};

export default SidebarRight;
