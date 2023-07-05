import {getDetailPlaylist, searchApi} from "../../api/music";
import actionTypes from "./actionTypes";

export const setCurrentSongId = (songId) => ({
  type: actionTypes.SET_CURRENT_SONG_ID,
  songId,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const setLoading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

export const setCurrentSongData = (data) => ({
  type: actionTypes.SET_CURRENT_SONG_DATA,
  data,
});

export const setCurrentAlbumId = (id) => ({
  type: actionTypes.SET_CURRENT_ALBUM_ID,
  id,
});

export const setRecentSong = (data) => ({
  type: actionTypes.SET_RECENT_SONG,
  data,
});

export const search = (keyword) => async (action) => {
  try {
    const res = await searchApi(keyword);
    if (res?.data?.err === 0) {
      action({
        type: actionTypes.SEARCH,
        data: res?.data?.data,
        keyword,
      });
    } else {
      action({
        type: actionTypes.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    action({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};
