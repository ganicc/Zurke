import React, { Component } from "react";
import { prikazSvihZurki} from "./FjeZurke";
import { Link } from "react-router-dom";

//import { isLogged, isAdmin } from "../../backend/auth";

export default class zurke extends Component {
  constructor() {
    super();
    this.state = {
      lista: []
    };
  }
  componentDidMount() {
    
    prikazSvihZurki().then(res=>{
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
            <table responsive="lg">
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
                <td><Link>{zurka.naziv}</Link></td>
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


