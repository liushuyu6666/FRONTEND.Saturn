import React from 'react';
import Home from './Component/Home';
import Login from "./Component/Login";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddCareer from "./Component/AddCareer";
import RetrieveCareer from "./Component/RetrieveCareer";
import UpdateCareer from "./Component/UpdateCareer";


function App() {
  return (
      <Router>
        <Switch>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/add" exact>
                <AddCareer />
            </Route>
            <Route path="/retrieve/:careerId" exact>
                <RetrieveCareer />
            </Route>
            <Route path="/update/:careerId" exact>
                <UpdateCareer />
            </Route>
        </Switch>
      </Router>
  );
}

export default App;