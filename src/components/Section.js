import React, {memo} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Section = () => {
  const {albumHot} = useSelector((state) => state.app);
  const navigate = useNavigate();
  console.log("albumHot: ", albumHot);

  return (
    <div className="mt-[48px] px-[59px] text-textWhite flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-semibold">{albumHot?.title}</h3>
        <span>tat ca</span>
      </div>

      <div className="flex gap-7">
        {albumHot?.items?.slice(0, 5).map((item) => (
          <div
            key={item.encodeId}
            className="w-[224px] flex flex-col gap-3 flex-1 text-[14px]"
          >
            <img
              src={item.thumbnailM}
              alt=""
              className="w-full object-cover rounded-lg cursor-pointer"
              onClick={() => navigate(item?.link?.split(".")[0])}
            />
            <span className="flex flex-col gap-1">
              <span className="font-semibold cursor-pointer hover:text-select">{`${
                item?.title?.length > 27
                  ? `${item?.title?.slice(0, 27)}...`
                  : item?.title
              }`}</span>
              <span className="text-textGrey cursor-pointer contents hover:text-select">
                {item.sortDescription || item.artistsNames}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
