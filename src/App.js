import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Sidebar from "components/Sidebar";
import Login from "./Authentication/";
import Chat from "./pages/Chat";
import socket from "./socket/index";

// socket.on("receive-message", (message) => {
//   console.log(message.messagesBody);
// });

const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [startLoadProgress, setStartLoadProgress] = useState(false);

  useEffect(() => {
    if (userPrefersDark) document.body.classList.add("dark-theme");
    stopLoad();
  }, []);

  const stopLoad = () => {
    setStartLoadProgress(true);
    setTimeout(() => setAppLoaded(true), 3000);
  };

  if (!appLoaded) return <Loader done={startLoadProgress} />;

  return (
    <div className="app">
      <p className="app__mobile-message"> Only available on desktop 😊. </p>
      <Router>
        <div className="app-content">
          <Sidebar />
          <Switch>
            <Route path="/chat/:id" component={Chat} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
