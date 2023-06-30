import {Routes, Route} from "react-router-dom";
import {Home, Login, Public} from "./containers/public";
import path from "./utils/path";
import {useEffect} from "react";
import {getHomeData} from "./store/action/home";
import {useDispatch} from "react-redux";
import MyMusic from "./containers/public/MyMusic";

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

          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
