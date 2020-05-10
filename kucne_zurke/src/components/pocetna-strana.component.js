import React, { Component } from "react";
export default class PocetnaStrana extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Dobrodosli</h1>
          </div>
        </div>
        <img src="/images/slika.png" alt="" />
      </div>
    );
  }
}
