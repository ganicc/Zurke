import React, { Component } from "react";
import { register } from "./LogRegFunkcije";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Register extends Component {
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
      radio: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeRadio(e) {
    this.setState({ pol: e.target.value });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeDate(dat) {
    this.setState({ datumRodj: dat });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      ime: this.state.ime,
      prezime: this.state.prezime,
      korisnickoIme: this.state.korisnickoIme,
      sifra: this.state.sifra,
      datumRodj: this.state.datumRodj,
      email: this.state.email,
      pol: this.state.pol,
    };

    register(newUser).then((res) => {
      if (res) {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registracija</h1>
              <div className="form-group">
                <label htmlFor="ime">Ime</label>
                <input
                  type="text"
                  className="form-control"
                  name="ime"
                  value={this.state.ime}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prezime">Prezime</label>
                <input
                  type="text"
                  className="form-control"
                  name="prezime"
                  value={this.state.prezime}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="korisnickoIme">Korisnicko ime</label>
                <input
                  type="korisnickoIme"
                  className="form-control"
                  name="korisnickoIme"
                  value={this.state.korisnickoIme}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sifra">Sifra</label>
                <input
                  type="password"
                  className="form-control"
                  name="sifra"
                  value={this.state.sifra}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pol">Pol</label>
                <input
                  type="radio"
                  name="radio1"
                  value="muski"
                  checked={this.state.radio1}
                  onChange={this.onChangeRadio}
                />
                Muski
                <input
                  type="radio"
                  name="radio1"
                  value="zenski"
                  checked={this.state.radio1}
                  onChange={this.onChangeRadio}
                />
                Zenski
              </div>
              <div className="form-group">
                <label htmlFor="datumRodj">Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.datumRodj}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
