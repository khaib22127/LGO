import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotsAction from "./store/spot";
import Navigation from "./components/Navigation/Navigation";
import SearchResult from "./components/SearchBar/SearchResult";
import SpotDetails from "./components/Spots/SpotDetails";
import UserSpots from "./components/User/UserSpots";
import LandingPage from "./components/ALandingPage/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // dispatch(spotsAction.getAllSpots());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path={"/"}>
            <LandingPage />
          </Route>

          <Route exact path={"/category"}>
            <SearchResult />
          </Route>

          <Route path={`/spots/manage`}>
            <UserSpots />
          </Route>

          <Route exact path={`/spots/:spotId`}>
            <SpotDetails />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
