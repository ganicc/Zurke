import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/navbar.component.js";
import PocetnaStrana from "./components/pocetna-strana.component.js";
import Profil from "./components/profil.component.js";
import Login from "./components/login.component.js";
import Register from "./components/register.component.js";
import MojeZurke from "./components/mojezurke.component.js";
import ProfilZurke from "./components/profilZurke.component.js";
import RegistracijaZurke from "./components/RegistracijaZurke.component.js";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={PocetnaStrana} />
        <div className="container">
          <Route exact path="/profil" component={Profil} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/RegistracijaZurke"
            component={RegistracijaZurke}
          />
          <Route exact path="/mojezurke" component={MojeZurke} />
          <Route exact path="/profilZurke" component={ProfilZurke} />
        </div>
      </div>
    </Router>
  );
}

export default App;
