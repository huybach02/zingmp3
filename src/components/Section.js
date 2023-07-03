import React, {memo, useState} from "react";
import {useNavigate} from "react-router-dom";
import SectionItem from "./SectionItem";

const Section = ({data}) => {
  return (
    <div className="mt-[48px] px-[59px] text-textWhite flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-semibold">{data?.title}</h3>
        {data?.title && <span>tat ca</span>}
      </div>

      <div className="flex gap-7">
        {data?.items?.slice(0, 5).map((item) => (
          <SectionItem key={item.encodeId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(Section);
