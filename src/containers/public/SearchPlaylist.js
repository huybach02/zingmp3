import React from "react";
import {useSelector} from "react-redux";
import SectionItem from "../../components/SectionItem";

const SearchPlaylist = () => {
  const {searchData} = useSelector((state) => state.music);

  return (
    <div>
      <div className="flex justify-between flex-auto flex-wrap px-[59px]">
        {searchData?.playlists?.map((item) => (
          <div key={item.encodeId} className=" py-5">
            <SectionItem item={item} />
          </div>
        ))}
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default SearchPlaylist;
