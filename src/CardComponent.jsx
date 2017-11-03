import React from "react";

class CardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.flipCardFunction(this.props.clue);
  }

  render() {
    const blueTeamStyle = {
      backgroundColor: "#386FA4"
    };

    const redTeamStyle = {
      backgroundColor: "#E94F37"
    };

    const civilianTeamStyle = {
      backgroundColor: "#808080"
    };

    const assassinTeamStyle = {
      backgroundColor: "#000000"
    };

    const redText = {
      color: "#7f0000"
    };

    const blueText = {
      color: "#ADD8E6"
    };

    const civilianText = {
      color: "#000000"
    };

    const assassinText = {
      color: "#ffffff"
    };

    let cardStyle;
    let textStyle;

    switch (this.props.team) {
      case "red":
        cardStyle = redTeamStyle;
        textStyle = redText;
        break;

      case "blue":
        cardStyle = blueTeamStyle;
        textStyle = blueText;
        break;

      case "civilian":
        cardStyle = civilianTeamStyle;
        textStyle = civilianText;
        break;

      case "assassin":
        cardStyle = assassinTeamStyle;
        textStyle = assassinText;
        break;
    }

    let disable = null;
    this.props.disable ? (disable = true) : (disable = false);

    const unflipped = (
      <div className="card grow ">
        <div className="card-block">
          <button disabled={disable} type="button" className="btn btn-secondary card-button" onClick={this.handleClick}>
            <strong> {this.props.clue} </strong>
          </button>
        </div>
      </div>
    );

    const flipped = (
      <div className="card grow" style={cardStyle}>
        <div className="card-block">
          <button disabled type="button" className="btn btn-secondary card-button" onClick={this.handleClick}>
            <strong> {this.props.clue} </strong>
          </button>
        </div>
      </div>
    );

    return this.props.clicked ? flipped : unflipped;
  }
}

export default CardComponent;
