import React from "react";
import icons from "../utils/icon";
import Search from "./Search";
import {useNavigate, useParams} from "react-router-dom";

const {BsArrowLeft, BsArrowRight} = icons;

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full text-textGrey">
      <div className="flex items-center gap-6 w-full">
        <div className="flex gap-6">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <BsArrowLeft size="24px" />
          </span>
          <span className="cursor-pointer" onClick={() => navigate(1)}>
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
