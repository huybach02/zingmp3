import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {Header, SidebarLeft, SidebarRight} from "../../components";
import Player from "../../components/Player";
import {Scrollbars} from "react-custom-scrollbars-2";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);

  return (
    <div className="w-full relative h-screen flex flex-col">
      <div className="w-full h-full flex flex-auto ">
        <div className="w-[240px] h-full flex-none bg-[#2a213a]">
          <SidebarLeft />
        </div>

        <div className="flex-auto flex flex-col bg-primary ">
          <div className="h-[70px] flex-none bg-primary px-[59px] flex items-center">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars style={{width: "100%", height: "100%"}}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>

        {isShowRightSidebar && (
          <div className="sm:hidden 2xl:block w-[330px] flex-none bg-rightBar ">
            <SidebarRight />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-control ">
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
