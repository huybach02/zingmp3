import axios from "../axios";

export const getSong = (songId) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/song",
        method: "GET",
        params: {id: songId},
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export const getDetailSong = (songId) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/infosong",
        method: "GET",
        params: {id: songId},
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export const getDetailPlaylist = (playlistId) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/detailplaylist",
        method: "GET",
        params: {id: playlistId},
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export const searchApi = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/search",
        method: "GET",
        params: {keyword},
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export const getArtistSongApi = (singerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/artistsong",
        method: "GET",
        params: {
          id: singerId,
          page: 1,
          count: 50,
        },
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export const getArtistApi = (alias) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/artist",
        method: "GET",
        params: {
          name: alias,
        },
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

export const getChartHome = (alias) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/charthome",
        method: "GET",
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
