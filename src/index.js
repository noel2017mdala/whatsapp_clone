import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "Redux/Reducers";
import Login from "./Authentication/";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import "./assets/css/index.css";
import { UsersProvider } from "context/usersContext";
import Cookie from "universal-cookie";

let cookie = new Cookie();
let header = cookie.get("userPayLoad");
let userData = cookie.get("userData");

const middleware = [thunk];
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UsersProvider>{header && userData ? <App /> : <Login />}</UsersProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
