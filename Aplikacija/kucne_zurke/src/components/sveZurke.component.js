import React, { Component } from "react";
import { prikazSvihZurki} from "./FjeZurke";
//import { Link } from "react-router-dom";

//import { isLogged, isAdmin } from "../../backend/auth";

export default class SveZurke extends Component {
  constructor() {
    super();
    this.state = {
      lista: []
    };
  }
  componentDidMount() {
    
    prikazSvihZurki().then(res=>{
      if(res){
        console.log("1");
        const data=res;
        this.setState({
          lista: data
        })
        console.log("2");
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
            {this.state.lista.map(zurka=>(
              <div key={zurka._id}>
                <div>{zurka.naziv}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

/* 
<div>{Zurka.naziv}</div>
              <div>{Zurka.opis}</div>
              <div>{Zurka.tipZurke}</div>
              <div>{Zurka.brojljudi}</div>
              <div>{Zurka.datumRodj.toDateString().substring(3, 15)}</div>*/
