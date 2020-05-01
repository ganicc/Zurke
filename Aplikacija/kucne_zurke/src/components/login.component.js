import React, { Component } from "react";
import { login } from "./LogRegFunkcije";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      korisnickoIme: "",
      sifra: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const User = {
      korisnickoIme: this.state.korisnickoIme,
      sifra: this.state.sifra,
    };

    login(User).then((res) => {
      if (res) {
        this.props.history.push("/profil");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Molimo vas da se ulogujete
              </h1>
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
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
