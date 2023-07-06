import React from "react";
import {Link, useNavigate} from "react-router-dom";
import icons from "../utils/icon";

const {AiOutlineHeart, BsPlayCircle, BsThreeDots} = icons;

const SectionItem = ({item}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(item?.link?.split(".")[0], {state: {playAlbum: true}});
  };

  return (
    <div className="w-[224px] flex flex-col gap-3 flex-1 text-[14px] cursor-pointer">
      <div
        className="w-full overflow-hidden rounded-lg relative group"
        onClick={() =>
          navigate(item?.link?.split(".")[0], {state: {playAlbum: false}})
        }
      >
        <img
          src={item.thumbnailM}
          alt=""
          className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition"
        />
        <div className="absolute top-0 left-0 bottom-0 right-0 rounded-lg group-hover:bg-overlay-40% invisible group-hover:visible flex items-center justify-center gap-8">
          <AiOutlineHeart size={22} />
          <span onClick={handleClick}>
            <BsPlayCircle size={50} />
          </span>
          <BsThreeDots size={22} />
        </div>
      </div>
      <span className="flex flex-col gap-1">
        <span
          className="font-semibold cursor-pointer hover:text-select"
          onClick={() => navigate(item?.link?.split(".")[0])}
        >{`${
          item?.title?.length > 27
            ? `${item?.title?.slice(0, 27)}...`
            : item?.title
        }`}</span>
        <span className="text-textGrey contents ">
          {`${
            item?.sortDescription?.length > 27
              ? `${item?.sortDescription?.slice(0, 55)}...`
              : item?.sortDescription
          }` || (
            <span className="flex gap-1 flex-wrap">
              {item?.artists?.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className="cursor-pointer hover:text-select"
                >
                  {item.name + ", "}
                </Link>
              ))}
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

export default SectionItem;
