import React from "react";
import {Outlet} from "react-router-dom";
import {SidebarLeft, SidebarRight} from "../../components";
import Player from "../../components/Player";

const Public = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px]  flex-none bg-[#2a213a]">
          <SidebarLeft />
        </div>

        <div className="flex-auto bg-primary">
          <Outlet />
        </div>

        <div className="sm:hidden 2xl:block w-[330px] flex-none bg-rightBar ">
          <SidebarRight />
        </div>
      </div>

      <div className="flex-none h-[90px] bg-control">
        <Player />
      </div>
    </div>
  );
};

export default Public;
