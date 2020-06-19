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
    prikazSvihZurki().then((res) => {
      if (res) {
       this.setState({
         lista: res.data
       })
       console.log("1");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Profil</h1>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
