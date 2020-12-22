import React from 'react';
import Federation from "./Federation";
import usaMap from "./usaMap";

export default class Map extends React.Component {
   constructor(props) {
      super(props)
   }

   componentDidMount() {
      console.log(this.props);
   }

   render() {
      return (
         <div>
            <svg
               className="map"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="477 421 593.3779761904764 318.2870370370371">
                  {usaMap.map((federation, index) => {
                     return <g className="federation" key={index}><Federation d={federation.d} title={federation.title} id={federation.id} handleClick={this.props.handleClick} /></g>
                  })}
            </svg>
         </div>
      );
   }
}