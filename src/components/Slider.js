import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getArraySlider} from "../utils/helper";
import {
  play,
  playAlbum,
  setCurrentSongId,
  setPlaylist,
} from "../store/action/music";
import {useNavigate} from "react-router-dom";

const Slider = () => {
  const {banner} = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      let list = [];
      //Fix bug neu chi co dung 3 tam hinh thi se animation se bi loi (do ham getArraySlider hoat dong sai)
      if (sliderEls.length - 1 <= 2) {
        list = sliderEls;
        return;
      }
      list = getArraySlider(min, max, sliderEls.length - 1);
      for (let i = 0; i < sliderEls.length; i++) {
        // Delete classnames (css)
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-5"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );

        // Hide or Show images
        if (list && list.some((item) => item === i)) {
          sliderEls[i].style.cssText = `display: block`;
        } else {
          sliderEls[i].style.cssText = `display: none`;
        }
      }
      // Add animation by adding classnames
      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-5"
          );
        } else if (item === min) {
          sliderEls[item]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });
      min = min === sliderEls.length - 1 ? 0 : min + 1;
      max = max === sliderEls.length - 1 ? 0 : max + 1;
    }, 3000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(setPlaylist(null));
      dispatch(setCurrentSongId(item.encodeId));
      dispatch(play(true));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(setPlaylist(null));
    }
  };

  return (
    <div className="flex gap-7 w-full overflow-hidden px-[59px] pt-8">
      {banner?.map((item, index) => (
        <img
          key={item.encodeId}
          src={item.banner}
          alt=""
          className={`slider-item cursor-pointer flex-1 object-contain w-[30%] rounded-lg ${
            index <= 2 ? "block" : "hidden"
          }`}
          onClick={() => handleClickBanner(item)}
        />
      ))}
    </div>
  );
};

export default Slider;
