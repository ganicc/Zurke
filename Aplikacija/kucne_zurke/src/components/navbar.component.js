/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-render-return */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link to="/zurke" className="nav-link">
            Aktuelne zurke
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profil" className="nav-link">
            Profil
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profilZurke" className="nav-link">
            Profil zurke
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/registerZurka" className="nav-link">
            Kreiraj zurku
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav=link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-targer="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="Toogle navigaion"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-contect-md-center"
          id="navbar1"
        >
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Pocetna strana
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink: loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
