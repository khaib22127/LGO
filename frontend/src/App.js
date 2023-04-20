import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import SearchResult from "./components/SearchBar/SearchResult";
import SpotDetails from "./components/Spots/AllSpots/SpotDetails";
import UserSpots from "./components/User/UserSpots";
import UserCreateSpot from "./components/User/UserCreateSpot";
import UserEditSpot from "./components/User/UserEditSpot";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path={"/"}>
            <SearchResult />
          </Route>

          <Route path={`/spots/manage`}>
            <UserSpots />
          </Route>

          <Route exact path={`/spots/new`}>
            <UserCreateSpot />
          </Route>

          <Route exact path={`/spots/:spotId`}>
            <SpotDetails />
          </Route>

          <Route exact path={`/spots/:spotId/edit`}>
            <UserEditSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
