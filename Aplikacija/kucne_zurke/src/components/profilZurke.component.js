import React, { Component } from "react";
import {prikazZurke} from "./FjeZurke";
import jwt_decode from "jwt-decode";
//import { Link } from "react-router-dom";

//import { isLogged, isAdmin } from "../../backend/auth";

export default class ProfilZurke extends Component {
  constructor() {
    super();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state = {
      organizator: decoded.ime,
      naziv: "",
      opis: "",
      datumOdrzavanja: new Date(),
      tipZurke: "",
      brojljudi: 0,
    };
  }
  componentDidMount() {
    const Zurka={
      organizator:this.state.organizator,
      naziv: "Zarkova zurka 4",
      opis: this.state.organizator,
      datumOdrzavanja: this.state.datumOdrzavanja,
      tipZurke: this.state.tipZurke,
      brojljudi: this.state.brojljudi,
    };
    //const naziv="Zarkova zurka 4";

    prikazZurke(Zurka).then((res) => {
      if (res) {
        this.setState({
          organizator:this.state.organizator,
          naziv: res.data.naziv,
          opis: res.data.opis,
          datumOdrzavanja: res.data.datumOdrzavanja,
          tipZurke: res.data.tipZurke,
          brojljudi: res.data.brojljudi
        })
      }
    });
    
  
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Profil</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Organizator zurke</td>
                <td>{this.state.organizator}</td>
              </tr>
              <tr>
                <td>Naziv Zurke</td>
                <td>{this.state.naziv}</td>
              </tr>
              <tr>
                <td>Opis zurke</td>
                <td>{this.state.opis}</td>
              </tr>
              <tr>
                <td>Tip zurke</td>
                <td>{this.state.tipZurke}</td>
              </tr>
              <tr>
                <td>Datum odrzavanja zurke</td>
                <td>
                  {" "}
                  {this.state.datumOdrzavanja.toDateString().substring(3, 15)}
                </td>
              </tr>
              <tr>
                <td>Broj ljudi koji moze pristustvovati </td>
                <td>{this.state.brojljudi}</td>
              </tr>
            </tbody>
          </table>
          <div></div>
        </div>
      </div>
    );
  }
}
