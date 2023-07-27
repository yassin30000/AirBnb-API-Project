// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetails from "./SpotDetails/SpotDetails";
import { fetchSpots } from "./store/spots";

import './index.css'
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path='/spots/:spotId'>
            
            <SpotDetails isLoaded={isLoaded} />
          </Route>

          <Route path='/'>
            <LandingPage />
          </Route>


        </Switch>

      )}
    </div>
  );
}

export default App;