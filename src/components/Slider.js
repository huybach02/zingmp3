import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getArraySlider} from "../utils/helper";
import {setCurrentSongId} from "../store/action/music";

const Slider = () => {
  const {banner} = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArraySlider(min, max, sliderEls.length - 1);
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
        if (list.some((item) => item === i)) {
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
    if (item.type === 1) {
      dispatch(setCurrentSongId(item.encodeId));
    }
  };

  return (
    <div className="flex gap-7 w-full overflow-hidden px-[59px] pt-8 ">
      {banner?.map((item, index) => (
        <img
          key={item.encodeId}
          src={item.banner}
          alt=""
          className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
            index <= 2 ? "block" : "hidden"
          }`}
          onClick={() => handleClickBanner(item)}
        />
      ))}
    </div>
  );
};

export default Slider;
