import {Routes, Route} from "react-router-dom";
import {Home, Login, Public} from "./containers/public";
import path from "./utils/path";
import {useEffect} from "react";
import {getHomeData} from "./store/action/home";
import {useDispatch} from "react-redux";
import MyMusic from "./containers/public/MyMusic";
import Album from "./containers/public/Album";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeekChart from "./components/WeekChart";
import ZingChartPage from "./containers/public/ZingChartPage";
import SearchSong from "./containers/public/SearchSong";
import SearchAll from "./containers/public/SearchAll";
import SearchPage from "./containers/public/SearchPage";
import Singer from "./containers/public/Singer";
import SearchPlaylist from "./containers/public/SearchPlaylist";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.MY_MUSIC} element={<MyMusic />} />
          <Route path={path.ALBUM_TITLE_ID} element={<Album />} />
          <Route path={path.PLAYLIST_TITLE_ID} element={<Album />} />
          <Route path={path.WEEKCHART_TITLE_ID} element={<WeekChart />} />
          <Route path={path.ZINGCHART} element={<ZingChartPage />} />
          <Route path={path.HOME_SINGER} element={<Singer />} />
          <Route path={path.HOME_ARTIST_SINGER} element={<Singer />} />
          <Route path={path.SEARCH} element={<SearchPage />}>
            <Route path={path.ALL} element={<SearchAll />} />
            <Route path={path.SONG} element={<SearchSong />} />
            <Route path={path.PLAYLIST} element={<SearchPlaylist />} />
          </Route>

          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
