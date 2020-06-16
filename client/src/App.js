import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavPage from "./components/views/NavPage/NavPage";
import TestPage from "./components/views/TestPage/TestPage";
import DefaultPage from "./components/views/DefaultPage/DefaultPage";
import FooterPage from "./components/views/FooterPage/FooterPage";
import AdminLandingPage from "./components/views/AdminLandingPage/AdminLandingPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavPage />
      <div
        style={{
          paddingTop: "75px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          />
          <Route exact path="/admin" component={AdminLandingPage} />
          />
          <Route exact path="/test" component={TestPage} />
          <Route component={DefaultPage} />
        </Switch>
      </div>
      <FooterPage />
    </Suspense>
  );
}

export default App;
