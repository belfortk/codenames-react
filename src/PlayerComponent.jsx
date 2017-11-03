import React from "react";

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleClick =  this.handleClick.bind(this);
  }

handleClick(){
  console.log('hello')
  this.props.passTurn();
}

  render() {
    let isOff = null;

    (this.props.name === this.props.currentTurn ) ? isOff=false : isOff=true;

    return (
      <div className="col-md-1">
    
        <p>{this.props.name.toUpperCase()} TEAM</p>
        <p>Remaining: {this.props.score}</p>
        {this.props.clues.map(word => <p> {word.clue + " (" + word.num + ")"} </p>)}
        <button disabled={ isOff }type="button" className="btn btn-warning" onClick={ this.handleClick }>Pass</button>
      
      </div>
    );
  }
}

export default PlayerComponent;