import React from "react";
import icons from "../utils/icon";
import Search from "./Search";

const {BsArrowLeft, BsArrowRight} = icons;

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full text-textGrey">
      <div className="flex items-center gap-6 w-full">
        <div className="flex gap-6">
          <span>
            <BsArrowLeft size="24px" />
          </span>
          <span>
            <BsArrowRight size="24px" />
          </span>
        </div>

        <div className="sm:w-3/5 lg:w-2/5">
          <Search />
        </div>
      </div>

      <div>Login</div>
    </div>
  );
};

export default Header;
