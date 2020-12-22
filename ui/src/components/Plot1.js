import React from 'react';

import "../../node_modules/react-vis/dist/style.css";
import {
   LabelSeries,
   XYPlot,
   XAxis,
   YAxis,
   HorizontalGridLines,
   VerticalGridLines,
   LineSeries
} from 'react-vis';

export default class Plot1 extends React.Component {
   constructor(props) {
      super(props)
   }

   componentDidMount() {
      console.log(this.props);
   }

   render() {
      return (
         <XYPlot width={300} height={300}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <YAxis title="Y Axis" />
            <LineSeries className="first-series" data={this.props.data1} />
            <LineSeries className="secod-series" data={this.props.data2} />
         </XYPlot>
      );
   }
}