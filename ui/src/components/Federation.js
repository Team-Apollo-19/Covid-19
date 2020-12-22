import React from 'react';


export default class Federation extends React.Component {
   
   constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
      this.props.handleClick(this.props)
   }

   render() {

      return (
         <g onClick={this.handleClick}>
            <path
               d= {this.props.d}
               title= {this.props.title}
               id= {this.props.id} />
         </g>
      );
   }
}