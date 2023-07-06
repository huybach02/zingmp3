import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getSearchSong} from "../../store/action/music";
import ListSong from "../../components/ListSong";

const SearchSong = () => {
  const dispatch = useDispatch();
  const {searchData} = useSelector((state) => state.music);
  console.log("searchData: ", searchData);

  useEffect(() => {
    dispatch(getSearchSong(searchData?.top?.playlistId));
  }, [searchData]);

  return (
    <div className="px-[59px]">
      <ListSong />
      <div className="h-[200px]"></div>
    </div>
  );
};

export default SearchSong;
