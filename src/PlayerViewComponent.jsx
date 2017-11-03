import React from "react";
import CardComponent from './CardComponent.jsx';

class PlayerView extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div>
        <div className="card-deck">
          {this.props.words[0].map((wordObj, index) => (
            <CardComponent
              clue={wordObj.word}
              key={Math.floor(Math.random() * 10000) + 1}
              team={wordObj.team}
              clicked={wordObj.clicked}
              flipCardFunction={this.flipCard}
            />
          ))}
        </div>

        <div className="card-deck">
          {this.props.words[1].map((wordObj, index) => (
            <CardComponent
              clue={wordObj.word}
              key={Math.floor(Math.random() * 10000) + 1}
              team={wordObj.team}
              clicked={wordObj.clicked}
              flipCardFunction={this.flipCard}
            />
          ))}
        </div>

        <div className="card-deck">
          {this.props.words[2].map((wordObj, index) => (
            <CardComponent
              clue={wordObj.word}
              key={Math.floor(Math.random() * 10000) + 1}
              team={wordObj.team}
              clicked={wordObj.clicked}
              flipCardFunction={this.flipCard}
            />
          ))}
        </div>

        <div className="card-deck">
          {this.props.words[3].map((wordObj, index) => (
            <CardComponent
              clue={wordObj.word}
              key={Math.floor(Math.random() * 10000) + 1}
              team={wordObj.team}
              clicked={wordObj.clicked}
              flipCardFunction={this.flipCard}
            />
          ))}
        </div>

        <div className="card-deck">
          {this.props.words[4].map((wordObj, index) => (
            <CardComponent
              clue={wordObj.word}
              key={Math.floor(Math.random() * 10000) + 1}
              team={wordObj.team}
              clicked={wordObj.clicked}
              flipCardFunction={this.flipCard}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlayerView;
