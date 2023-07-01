import React from "react";
import logo from "../assets/logo-zingmp3.png";
import {sidebarMenu} from "../utils/menu";
import {NavLink, useNavigate} from "react-router-dom";
import path from "../utils/path";

const notActiveStyle =
  "py-2 px-[25px] h-[48px] font-semibold flex items-center gap-3 text-[#dadada] text-[14px] ";
const activeStyle =
  "py-2 px-[25px] h-[48px] font-semibold flex items-center gap-3 text-[#dadada] text-[14px] bg-[#40384e]";

const SidebarLeft = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path.HOME);
  };
  return (
    <div className="flex flex-col h-full">
      <div
        className="w-full h-[70px] py-[15px] px-[25px] mb-[15px] flex justify-start items-center cursor-pointer"
        onClick={handleClick}
      >
        <img src={logo} alt="logo" className="w[120px] h-[40px] object-cover" />
      </div>

      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({isActive}) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icon}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
