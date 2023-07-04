import actionTypes from "../action/actionTypes";

const initState = {
  currentSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  currentSongData: null,
  currentAlbumId: null,
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
    case actionTypes.SET_CURRENT_SONG_DATA:
      return {
        ...state,
        currentSongData: action.data || null,
      };
    case actionTypes.SET_CURRENT_ALBUM_ID:
      return {
        ...state,
        currentAlbumId: action.id || null,
      };

    default:
      return state;
  }
};

export default musicReducer;
