import actionTypes from "../action/actionTypes";

const initState = {
  currentSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  currentSongData: null,
  currentAlbumId: null,
  recentSongs: [],
  searchData: {},
  keyword: "",
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
    case actionTypes.SET_RECENT_SONG:
      let songs = state.recentSongs;
      if (action.data) {
        if (
          state.recentSongs?.some((item) => item.songId === action.data.songId)
        ) {
          songs = songs.filter((item) => item.songId !== action.data.songId);
        }
        if (songs.length > 19) {
          songs = songs.filter(
            (item, index, self) => index !== self.length - 1
          );
        }

        songs = [action.data, ...songs];
      }
      return {
        ...state,
        recentSongs: songs,
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action.data || null,
        keyword: action.keyword || "",
      };

    default:
      return state;
  }
};

export default musicReducer;
