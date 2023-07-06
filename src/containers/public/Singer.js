import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getArtistApi} from "../../api/music";
import ListSongItem from "../../components/ListSongItem";
import SectionItem from "../../components/SectionItem";
import Artist from "../../components/Artist";
import parse from "html-react-parser";
import LoadingData from "../../components/LoadingData";

const Singer = () => {
  const {singer} = useParams();
  const [artistData, setArtistData] = useState();
  console.log("artistData: ", artistData);

  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await getArtistApi(singer);
      if (res?.data?.err === 0) {
        setArtistData(res?.data?.data);
      }
    };

    if (singer) {
      fetchArtistData();
    }
  }, [singer]);

  return (
    <>
      {artistData?.cover && (
        <div className="flex flex-col w-full px-[59px] text-white">
          <img
            src={artistData?.cover}
            alt=""
            className="w-full h-[300px] object-cover rounded-lg"
          />
          <div>
            <h1 className="text-[60px] font-bold py-5">{artistData?.name}</h1>
            <div className="flex gap-5">
              <span>
                {new Intl.NumberFormat("en-US").format(artistData?.totalFollow)}{" "}
                người quan tâm
              </span>
              <button
                type="button"
                className="bg-select px-6 py-1 rounded-l-full rounded-r-full flex items-center justify-center gap-1 text-[14px]"
              >
                QUAN TÂM
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[20px] font-bold my-6">Bài Hát</h3>
            <div className="flex justify-between gap-3 flex-wrap w-full">
              {artistData?.sections
                ?.find((item) => item.sectionId === "aSongs")
                ?.items?.map((item) => (
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
              {artistData?.sections
                ?.find((item) => item.sectionId === "aSingle")
                ?.items.slice(0, 5)
                .map((item) => (
                  <div key={item.encodeId} className="flex-1">
                    <SectionItem item={item} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[20px] font-bold my-6">Xuất Hiện Trong</h3>
            <div className="flex gap-3 flex-wrap ">
              {artistData?.sections
                ?.find((item) => item.sectionId === "aPlaylist")
                ?.items?.slice(0, 5)
                .map((item) => (
                  <div className="flex-1">
                    <SectionItem key={item.encodeId} item={item} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[20px] font-bold my-6">Có Thể Bạn Sẽ Thích</h3>
            <div className="flex justify-between gap-3 flex-wrap ">
              {artistData?.sections
                ?.find((item) => item.sectionId === "aReArtist")
                ?.items.map((item) => (
                  <div key={item.id} className="py-5">
                    <Artist
                      image={item.thumbnail}
                      title={item.name}
                      follow={item.totalFollow}
                      link={item.link}
                    ></Artist>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-[20px] font-semibold">Về {artistData?.name}</h3>
            <div className="flex gap-8 mt-6">
              <img
                src={artistData?.thumbnailM}
                alt=""
                className="w-[500px] object-cover rounded-lg"
              />
              <div>
                <p
                  dangerouslySetInnerHTML={{__html: artistData?.biography}}
                  className="text-[14px] text-textGrey"
                ></p>
                <div className="flex py-10 gap-10">
                  <div className="flex flex-col">
                    <span className="text-[20px] font-bold">
                      {new Intl.NumberFormat("en-US").format(
                        artistData?.totalFollow
                      ) || 0}
                    </span>
                    <span className="text-[14px] text-textGrey">
                      Người quan tâm
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[20px] font-bold">
                      {artistData?.awards?.length || 0}
                    </span>
                    <span className="text-[14px] text-textGrey">
                      Giải thưởng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[200px]"></div>
        </div>
      )}
      {!artistData?.cover && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary z-10 flex items-center justify-center">
          <LoadingData />
        </div>
      )}
    </>
  );
};

export default Singer;
