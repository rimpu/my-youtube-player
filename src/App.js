import React from "react";
import MyYouTubePlayer from "./components/player";
import SidePanel from "./components/side-panel";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MyYouTubePlayer />
        <SidePanel />
      </Provider>
    </div>
  );
}

export default App;
