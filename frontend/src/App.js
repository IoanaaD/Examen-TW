import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Video from "./components/pages/Video";
import Navbar from "./components/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoById from "./components/video/VideoById";
import "./index.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <section className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favouriteLists" component={Home}></Route>
            <Route exact path="/videos" component={Video}></Route>
            <Route exact path="/videos/:id" component={VideoById}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
