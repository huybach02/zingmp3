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
