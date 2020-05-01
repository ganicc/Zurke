import React, { Component } from "react";
import jwt_decode from "jwt-decode";

export default class Profil extends Component {
  constructor() {
    super();
    this.state = {
      ime: "",
      prezime: "",
      korisnickoIme: "",
      sifra: "",
      datumRodj: new Date(),
      email: "",
      pol: "",
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      ime: decoded.ime,
      prezime: decoded.prezime,
      korisnickoIme: decoded.korisnickoIme,
      sifra: decoded.sifra,
      datumRodj: decoded.datumRodj,
      email: decoded.email,
      pol: decoded.pol,
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
                <td>Ime</td>
              </tr>
              <tr>
                <td>Prezime</td>
              </tr>
              <tr>
                <td>Korisnicko ime</td>
              </tr>
              <tr>
                <td>Sifra</td>
              </tr>
              <tr>
                <td>Datum rodjenja</td>
              </tr>
              <tr>
                <td>Email</td>
              </tr>
              <tr>
                <td>Pol</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
