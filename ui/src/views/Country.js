import Plot1 from "../components/Plot1";
import Map from "../components/Map";
import Title from "../components/Title";
import '../static/css/layout.css';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import history from '../history'

import { withRouter } from "react-router";

import { functions } from "../components/Firebase/firebase";

const axios = require('axios');


class Country extends React.Component {
   constructor(props) {
      super(props)
      this.functions = functions
      this.handleClick = this.handleClick.bind(this);
      this.state = {
         federationId: "",
         federationName: "",
         plot1: [],
         plot2: []
      }
   }

   componentDidMount() {

      var url = "http://localhost:5001/covid-tracker-5898/us-central1/api/states/USA"
      axios.get(url)
         .then(resp => {

            this.setState({
               plot2: resp.data.map(tF => {
                  return {
                     x: Number(tF.date),
                     y: Number(tF.positiveIncrease)
                  }
               })
            })

            this.setState({
               plot2: resp.data.map(tF => {
                  return {
                     x: Number(tF.date),
                     y: Number(tF.total / 500)
                  }
               })
            })
            window.scrollTo(0, document.body.scrollHeight);
         })
         .catch(err => {
            console.log(err)
         })
   }

   handleClick(federation) {
      this.setState({
         federationId: federation.id,
         federationName: federation.title
      });


      history.push("/state/" + federation.id);

      window.location.reload()
   }

   render() {
      return (
         <div className="wrapper">
            <div className="container">
               <div className="item2">
                  <Map handleClick={this.handleClick} />
               </div>
            </div>
            <div className="container">
               <div className="item1">
                  <Title className="big" federationName={this.state.federationName} />
                  {/* <Plot1 data={this.state.plot1} /> */}
                  <Plot1 data1={this.state.plot1} />
                  <Plot1 data1={this.state.plot2} />
               </div>
            </div>
         </div>
      );
   }
}



export default withRouter(Country);