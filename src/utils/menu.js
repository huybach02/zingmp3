import icons from "./icon";
const {MdOutlineLibraryMusic, BsDisc, FaChartBar, MdOutlineFeed} = icons;

export const sidebarMenu = [
  {
    path: "",
    text: "Khám Phá",
    end: true,
    icon: <BsDisc size={"24px"} />,
  },
  {
    path: "mymusic",
    text: "Cá Nhân",
    icon: <MdOutlineLibraryMusic size={"24px"} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <FaChartBar size={"24px"} />,
  },
  {
    path: "follow",
    text: "Theo Dõi",
    icon: <MdOutlineFeed size={"24px"} />,
  },
];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
];
