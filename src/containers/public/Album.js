import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getDetailPlaylist} from "../../api/music";
import moment from "moment";
import ListSong from "../../components/ListSong";
import {Scrollbars} from "react-custom-scrollbars-2";
import {useDispatch} from "react-redux";
import {setPlaylist} from "../../store/action/music";

const Album = () => {
  const {title, id} = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const res = await getDetailPlaylist(id);
      if (res?.data.err === 0) {
        setPlaylistData(res.data?.data);
        dispatch(setPlaylist(res?.data?.data?.song?.items));
      }
    };

    fetchDetailPlaylist();
  }, [id]);

  return (
    <div className="flex gap-8 w-full h-[80%] px-[59px] pt-[20px]">
      <div className="flex-none w-[25%] text-textWhite flex flex-col items-center shadow-md">
        <img
          src={playlistData?.thumbnailM}
          alt=""
          className="w-[300px] object-contain rounded-md"
        />
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
