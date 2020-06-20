import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/navbar.component.js";
import PocetnaStrana from "./components/pocetna-strana.component.js";
import Profil from "./components/profil.component.js";
import Login from "./components/login.component.js";
import Register from "./components/register.component.js";
import zurke from "./components/zurke.component.js";
import RegisterZurka from "./components/RegistracijaZurke.component";
import ProfilZurke from "./components/profilZurke.component.js";
import mojeZurke from "./components/mojeZurke.component.js";

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
          <Route exact path="/zurke" component={zurke}/>
          <Route exact path="/registerZurka" component={RegisterZurka}/>
          <Route exact path="/profilZurke" component={ProfilZurke} />
          <Route exact path="/mojeZurke" component={mojeZurke} />
        </div>
      </div>
    </Router>
  );
}

export default App;
