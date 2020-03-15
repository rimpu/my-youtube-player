import React from "react";
import MainContainer from "./container/mainContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainContainer />
      </Provider>
    </div>
  );
}

export default App;
