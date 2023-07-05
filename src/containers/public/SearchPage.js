import React, {useEffect, useState} from "react";
import {Outlet, NavLink, useSearchParams} from "react-router-dom";
import {searchMenu} from "../../utils/menu";
import {useSelector} from "react-redux";

const SearchPage = () => {
  const {keyword} = useSelector((state) => state.music);

  return (
    <div className="text-white">
      <div className="flex h-[50px] mb-7 items-center border-b border-bgIcon px-[59px]">
        <span className="text-[24px] font-bold pr-6 border-r border-bgIcon">
          Kết Quả Tìm Kiếm
        </span>
        <div className="flex items-center text-[14px] uppercase font-semibold text-textGrey">
          {searchMenu.map((item) => (
            <div
              key={item.path}
              className="px-6 hover:text-white cursor-pointer "
            >
              <NavLink
                to={`${item.path}?q=${keyword.replace(" ", "+")}`}
                className={({isActive}) => (isActive ? "text-select" : "")}
              >
                {item.text}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SearchPage;
