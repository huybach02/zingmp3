import actionTypes from "../action/actionTypes";

const initState = {
  banner: [],
  albumHot: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        albumHot:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
      };

    default:
      return state;
  }
};

export default appReducer;
