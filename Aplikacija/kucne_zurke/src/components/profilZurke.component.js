import React, { Component } from "react";
//import jwt_decode from "jwt-decode";
//import { Link } from "react-router-dom";

//import { isLogged, isAdmin } from "../../backend/auth";

export default class ProfilZurke extends Component {
  constructor() {
    super();
    this.state = {
      organizator: "",
      naziv: "",
      opis: "",
      datumOdrzavanja: new Date(),
      tipZurke: "",
      brojljudi: 0,
    };
  }
  /*componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      ime: decoded.ime,
      prezime: decoded.prezime,
      korisnickoIme: decoded.korisnickoIme,
      datumRodj: new Date(decoded.datumRodj),
      email: decoded.email,
      pol: decoded.pol,
      zurke: decoded.zurke,
    });
  }*/

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
                <td>Datum odrzavanja zurke</td>
                <td> {this.state.datumRodj.toDateString().substring(3, 15)}</td>
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
