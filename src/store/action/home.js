import actionTypes from "./actionTypes";
import {getHome} from "../../api/home";

export const getHomeData = () => async (action) => {
  try {
    const res = await getHome();
    if (res?.data.err === 0) {
      action({
        type: actionTypes.GET_HOME,
        homeData: res.data.data.items,
      });
    } else {
      action({
        type: actionTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    action({
      type: actionTypes.GET_HOME,
      homeData: null,
    });
  }
};
