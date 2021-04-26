import React from 'react';
import Login from "./Component/Login";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddCareer from "./Component/Career/AddCareer";
import RetrieveCareer from "./Component/Career/RetrieveCareer";
import UpdateCareer from "./Component/Career/UpdateCareer";
import ListCareer from "./Component/Career/ListCareer"
import {careerListEndPoint, careerAddEndPoint, careerRetrieveEndPoint, careerUpdateEndPoint} from "./EndPoint/Career"


function App() {
  return (
      <Router>
        <Switch>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path={careerListEndPoint} exact>
                <ListCareer />
            </Route>
            <Route path={careerAddEndPoint} exact>
                <AddCareer />
            </Route>
            <Route path={`${careerRetrieveEndPoint}/:careerId`} exact>
                <RetrieveCareer />
            </Route>
            <Route path={`${careerUpdateEndPoint}/:careerId`} exact>
                <UpdateCareer />
            </Route>
        </Switch>
      </Router>
  );
}

export default App;