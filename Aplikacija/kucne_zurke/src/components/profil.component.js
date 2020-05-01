import React, { Component } from "react";
import jwt_decode from "jwt-decode";

export default class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ime: "",
      prezime: "",
      korisnickoIme: "",
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
      datumRodj: new Date(decoded.datumRodj),
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
                <td>{this.state.ime}</td>
              </tr>
              <tr>
                <td>Prezime</td>
                <td>{this.state.prezime}</td>
              </tr>
              <tr>
                <td>Korisnicko ime</td>
                <td>{this.state.korisnickoIme}</td>
              </tr>
              <tr>
                <td>Datum rodjenja</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Pol</td>
                <td>{this.state.pol}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
