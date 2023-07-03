import actionTypes from "../action/actionTypes";

const initState = {
  banner: [],
  albumHot: {},
  chill: {},
  top100: {},
  artist: {},
  energy: {},
  remix: {},
  isLoading: false,
  newRelease: {},
  weekChart: [],
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
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        artist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        energy:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        remix:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || [],
      };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
