import React, { Component } from "react";
import { registracijaZurke } from "./FjeZurke";
import DatePicker from "react-datepicker";
import jwt_decode from "jwt-decode";
import "react-datepicker/dist/react-datepicker.css";

export default class RegistracijaZurke extends Component {
  constructor() {
    super();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state = {
      organizator: decoded.korisnickoIme,
      naziv: "",
      opis: "",
      datumOdrzavanja: new Date(),
      tipZurke: "",
      brojljudi: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeDate(dat) {
    this.setState({ datumOdrzavanja: dat });
  }

  onSubmit(e) {
    e.preventDefault();

    const NovaZurka = {
      organizator: this.state.organizator,
      naziv: this.state.naziv,
      opis: this.state.opis,
      tipZurke: this.state.tipZurke,
      brojljudi: this.state.brojljudi,
      datumOdrzavanja: this.state.datumOdrzavanja,
    };
    registracijaZurke(NovaZurka).then((res) => {
      if (res) {
        console.log("push/profil");
        this.props.history.push("/ProfilZurke");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registracija Zurke</h1>

              <div>
                <label htmlFor="naziv">Naziv Zurke:</label>
                <input
                  type="text"
                  className="form-control"
                  name="naziv"
                  value={this.state.naziv}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="opis">Ukratki opis zurke:</label>
                <input
                  type="text"
                  className="form-control"
                  name="opis"
                  value={this.state.opis}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipZurke">Tip zurke:</label>
                <input
                  type="text"
                  className="form-control"
                  name="tipZurke"
                  value={this.state.tipZurke}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="brojljudi">Broj ljudi:</label>
                <input
                  type="Number"
                  className="form-control"
                  name="brojljudi"
                  value={this.state.brojljudi}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="datumOdrzavanja">Datum odrzavanja </label>
                <div>
                  <DatePicker
                    selected={this.state.datumOdrzavanja}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Napravi Zurku
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
