import React from "react";

class FirstTeamComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-4 clues" style={{ backgroundColor: this.props.team }}>
        <p>
          Words:
          {this.props.TeamWords.map(word => <span> {word} </span>)}
        </p>
        <p>
          Civilian Words:
          {this.props.civilianWords.map(word => <span> {word} </span>)}
        </p>
        <p>
          Assassin:
          {this.props.assassinWord.map(word => <span> {word} </span>)}
        </p>
      </div>
    );
  }
}

export default FirstTeamComponent;
