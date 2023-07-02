import actionTypes from "../action/actionTypes";

const initState = {
  currentSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG_ID:
      return {
        ...state,
        currentSongId: action.songId || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };

    default:
      return state;
  }
};

export default musicReducer;
