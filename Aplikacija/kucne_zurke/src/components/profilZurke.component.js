import React, { Component } from "react";
import {prikazZurke} from "./FjeZurke";
import jwt_decode from "jwt-decode";
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
  componentDidMount() {
    const naziv="Miloseva zurka";

    prikazZurke(naziv).then(res=>{
      if(res){
        const data=res;
        this.setState({
          organizator:data[0].organizator,
          naziv:data[0].naziv,
          opis:data[0].opis,
          datumOdrzavanja:new Date(data[0].datumOdrzavanja),
          tipZurke:data[0].tipZurke,
          brojljudi:data[0].brojljudi
        })       
      }
    })   
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
