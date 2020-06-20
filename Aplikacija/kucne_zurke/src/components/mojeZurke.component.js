import React, { Component } from "react";
import { prikazMojihZurki} from "./FjeZurke";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

//import { isLogged, isAdmin } from "../../backend/auth";

export default class mojeZurke extends Component {
  constructor() {
    super();
    this.state = {
      lista: []
    };
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const organizator=decoded.korisnickoIme;
    console.log(organizator);
    prikazMojihZurki(organizator).then(res=>{
      if(res){
        const data=res;
        this.setState({
          lista: data
        }) 
      }
    
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Aktuelne zurke</h1>
            <div>
            <table className="table col-md-6 mx-auto">
              <thead>
                <tr>
                  <th>Organizator</th>
                  <th>Naziv</th>
                  <th>Opis</th>
                  <th>Tip</th>
                  <th>Datum</th>
                  <th>Broj ljudi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                {this.state.lista.map(zurka=>(
                <tr key={zurka._id}>
                  <td>{zurka.organizator}</td>
                  <td><Link to='/profilZurke'>{zurka.naziv}</Link></td>
                  <td>{zurka.opis}</td>
                  <td>{zurka.tipZurke}</td>
                  <td>{zurka.datumOdrzavanja.substring(0, 10)}</td>
                  <td>{zurka.brojljudi}</td>
              </tr>
                ))}
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    );
  }
}


