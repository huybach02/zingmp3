import React from "react";
import {formatNumber} from "../utils/helper";
import {Link} from "react-router-dom";

const Artist = ({image, title, follow, link}) => {
  return (
    <div className=" flex flex-col items-center gap-2">
      <Link to={link}>
        <img
          src={image}
          alt=""
          className="w-[266px] h-[266px] object-cover rounded-full cursor-pointer"
        />
      </Link>
      <Link
        to={link}
        className="text-[14px] font-semibold cursor-pointer hover:text-select"
      >
        {title}
      </Link>
      <span className="text-[12px] text-textGrey">
        {formatNumber(follow) + " quan tâm"}
      </span>
      <button
        type="button"
        className="bg-select px-6 py-1 rounded-l-full rounded-r-full flex items-center justify-center gap-1 text-[14px]"
      >
        QUAN TÂM
      </button>
    </div>
  );
};

export default Artist;
