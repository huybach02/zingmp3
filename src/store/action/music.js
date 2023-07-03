import {getDetailPlaylist} from "../../api/music";
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

// export const fetchDetailPlaylist = (playlistId) => async (action) => {
//   try {
//     const res = await getDetailPlaylist(playlistId);
//     if (res?.data.err === 0) {
//       action({
//         type: actionTypes.PLAYLIST,
//         songs: res?.data?.data?.song?.items,
//       });
//     }
//   } catch (error) {
//     action({
//       type: actionTypes.PLAYLIST,
//       songs: null,
//     });
//   }
// };
