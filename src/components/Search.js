import React, {useEffect, useState} from "react";
import icons from "../utils/icon";
import {useDispatch} from "react-redux";
import {useNavigate, createSearchParams} from "react-router-dom";
import path from "../utils/path";
import {search} from "../store/action/music";

const {BsSearch, AiFillCloseCircle} = icons;

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full relative flex items-center">
      {keyword && (
        <span
          className="absolute right-3 cursor-pointer"
          onClick={() => setKeyword("")}
        >
          <AiFillCloseCircle size={18} />
        </span>
      )}
      <span className="px-4 flex items-center justify-between translate-x-[50px]">
        <BsSearch size={20} />
      </span>
      <input
        type="text"
        className="outline-none border-none bg-third px-11 py-2 rounded-[20px]  w-full text-[15px] text-white"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
