import React from "react";
import {useSelector} from "react-redux";
import {formatNumber} from "../../utils/helper";
import SongItem from "../../components/SongItem";
import ListSongItem from "../../components/ListSongItem";
import SectionItem from "../../components/SectionItem";
import Artist from "../../components/Artist";
import {Link} from "react-router-dom";

const SearchAll = () => {
  const {searchData} = useSelector((state) => state.music);
  console.log("searchData: ", searchData);

  return (
    <div className="w-full flex flex-col px-[59px]">
      <div className="flex flex-col gap-6">
        <h3 className="text-[20px] font-bold">Nổi Bật</h3>
        <div className="flex gap-8">
          {searchData?.top && (
            <Link
              to={searchData?.top?.link}
              className="flex items-center flex-1 gap-8 p-[10px] bg-searchItem hover:bg-bgIcon rounded-lg cursor-pointer"
            >
              <img
                src={searchData?.top?.thumbnail}
                alt=""
                className={`w-[84px] h-[84px] object-cover ${
                  searchData?.top?.objectType === "artist"
                    ? "rounded-full"
                    : "rounded-lg"
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[12px] mb-1 text-textGrey">
                  {(searchData?.top?.objectType === "artist" && "Nghệ sĩ") ||
                    (searchData?.top?.objectType === "song" && "Bài hát")}
                </span>
                <span className="text-[14px] font-semibold">
                  {searchData?.top?.title || searchData?.top?.name}
                </span>
                <span className="text-[12px] mt-1 text-textGrey">
                  {(searchData?.top?.objectType === "artist" &&
                    formatNumber(searchData?.artists[0]?.totalFollow) +
                      " quan tâm") ||
                    (searchData?.top?.objectType === "song" &&
                      searchData?.top?.artistsNames)}
                </span>
              </div>
            </Link>
          )}
          {searchData?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item) => (
              <div
                key={item.encodeId}
                className="flex-1 bg-searchItem flex items-center rounded-lg hover:bg-bgIcon"
              >
                <SongItem
                  key={item.encodeId}
                  thumbnail={item.thumbnail}
                  songId={item.encodeId}
                  title={item.title}
                  artists={item.artistsNames}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-[20px] font-bold my-6">Bài Hát</h3>
        <div className="flex justify-between gap-3 flex-wrap w-full">
          {searchData?.songs?.map((item) => (
            <div
              key={item.encodeId}
              className="flex-auto w-[40%] hover:bg-bgIcon cursor-pointer px-2 py-3 rounded-lg"
            >
              <ListSongItem songData={item} isHideAlbum />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-[20px] font-bold my-6">Playlist/Album</h3>
        <div className="flex justify-between gap-3 flex-wrap ">
          {searchData?.playlists?.slice(0, 5).map((item) => (
            <SectionItem key={item.encodeId} item={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-[20px] font-bold my-6">Nghệ Sĩ/OA</h3>
        <div className="flex justify-between gap-3 flex-wrap ">
          {searchData?.artists?.slice(0, 5).map((item) => (
            <div className="py-5">
              <Artist
                key={item.id}
                image={item.thumbnail}
                title={item.name}
                follow={item.totalFollow}
                link={item.link}
              ></Artist>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[200px]"></div>
    </div>
  );
};

export default SearchAll;
