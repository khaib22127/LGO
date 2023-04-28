import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotsAction from "./store/spot";
import Navigation from "./components/Navigation/Navigation";
import SearchResult from "./components/SearchBar/SearchResult";
import SpotDetails from "./components/Spots/SpotDetails";

import LandingPage from "./components/ALandingPage/LandingPage";
import UserSavedSpot from "./components/User/UserSavedSpot";
import UserManagePage from "./components/User/UserMangePage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

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

          <Route exact path={"/saves"}>
            <UserSavedSpot />
          </Route>

          <Route path={`/spots/manage`}>

            <UserManagePage />
          </Route>

          <Route exact path={`/spots/:spotId`}>
            <SpotDetails />
          </Route>
<Route path="*">
  <ErrorPage/>
</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
