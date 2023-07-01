import React from "react";
import {Outlet} from "react-router-dom";
import {Header, SidebarLeft, SidebarRight} from "../../components";
import Player from "../../components/Player";

const Public = () => {
  return (
    <div className="w-full relative h-screen flex flex-col">
      <div className="w-full h-full flex flex-auto ">
        <div className="w-[240px] h-full flex-none bg-[#2a213a]">
          <SidebarLeft />
        </div>

        <div className="flex-auto bg-primary ">
          <div className="h-[70px] bg-primary px-[59px] flex items-center mb-5">
            <Header />
          </div>
          <Outlet />
        </div>

        <div className="sm:hidden 2xl:block w-[330px] flex-none bg-rightBar ">
          <SidebarRight />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-control ">
        <Player />
      </div>
    </div>
  );
};

export default Public;
