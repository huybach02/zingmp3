import React from "react";
import icons from "../utils/icon";

const {BsSearch} = icons;

const Search = () => {
  return (
    <div className="w-full flex items-center">
      <span className="px-4 flex items-center justify-between translate-x-[50px]">
        <BsSearch size={20} />
      </span>
      <input
        type="text"
        className="outline-none border-none bg-third px-11 py-2 rounded-[20px]  w-full text-[15px]"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
};

export default Search;
