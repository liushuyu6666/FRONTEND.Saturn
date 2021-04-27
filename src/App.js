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
import ListLanguage from "./Component/Language/ListLanguage";
import AddLanguage from "./Component/Language/AddLanguage";
import {languageAddEndPoint, languageListEndPoint} from "./EndPoint/Language";
import {homePageEndPoint} from "./EndPoint/Home";
import Home from "./Component/Home";


function App() {
  return (
      <Router>
        <Switch>
            {/*login and register*/}
            <Route path="/login" exact>
                <Login />
            </Route>

            {/*home*/}
            <Route path={homePageEndPoint} exact>
                <Home />
            </Route>

            {/*career*/}
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

            {/*language*/}
            <Route path={languageListEndPoint} exact>
                <ListLanguage />
            </Route>
            <Route path={languageAddEndPoint} exact>
                <AddLanguage />
            </Route>

        </Switch>
      </Router>
  );
}

export default App;