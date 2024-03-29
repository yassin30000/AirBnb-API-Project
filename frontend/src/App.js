// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import { fetchSpots } from "./store/spots";
import CurrentSpots from "./components/CurrentSpots/CurrentSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";

import './index.css'
import LandingPage from "./components/LandingPage/LandingPage";

import NewSpot from "./components/NewSpot/NewSpot";



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

          <Route path='/spots/new'>
            <NewSpot />
          </Route>

          <Route path='/spots/current' >
            <CurrentSpots />
          </Route>

          <Route path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>

          <Route path='/spots/:spotId'>
            <SpotDetails isLoaded={isLoaded} />
          </Route>

          <Route exact path='/'>
            <LandingPage />
          </Route>


        </Switch>

      )}
    </div>
  );
}

export default App;