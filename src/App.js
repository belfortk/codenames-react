import React, { Component } from "react";
import logo from "./codenames.jpg";
import "./App.css";

import CardComponent from "./CardComponent.jsx";

import TeamWordsComponent from "./TeamWords.jsx";

import PlayerComponent from "./PlayerComponent.jsx";

import ClueFormComponent from "./ClueFormComponent.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    let startTurn;
    let secondTurn;
    Math.round(Math.random()) > 0 ? (startTurn = "blue") : (startTurn = "red");
    startTurn === "blue" ? (secondTurn = "red") : (secondTurn = "blue");

    var wordBank = [
      "air",
      "acorn",
      "africa",
      "agent",
      "air",
      "alien",
      "amazon",
      "angel",
      "antarctica",
      "apple",
      "arm",
      "back",
      "band",
      "bank",
      "bark",
      "beach",
      "belt",
      "berlin",
      "berry",
      "board",
      "bond",
      "boom",
      "bow",
      "box",
      "bug",
      "canada",
      "capital",
      "cell",
      "center",
      "china",
      "chocolate",
      "circle",
      "club",
      "compound",
      "copper",
      "crash",
      "cricket",
      "cross",
      "death",
      "dice",
      "dinosaur",
      "doctor",
      "dog",
      "dress",
      "dwarf",
      "eagle",
      "egypt",
      "engine",
      "england",
      "europe",
      "eye",
      "fair",
      "fall",
      "fan",
      "field",
      "file",
      "film",
      "fish",
      "flute",
      "fly",
      "forest",
      "fork",
      "france",
      "gas",
      "ghost",
      "giant",
      "glass",
      "glove",
      "gold",
      "grass",
      "greece",
      "green",
      "ham",
      "head",
      "himalaya",
      "hole",
      "hood",
      "hook",
      "human",
      "horseshoe",
      "hospital",
      "hotel",
      "ice",
      "ice cream",
      "india",
      "iron",
      "ivory",
      "jam",
      "jet",
      "jupiter",
      "kangaroo",
      "ketchup",
      "kid",
      "king",
      "kiwi",
      "knife",
      "knight",
      "lab",
      "lap",
      "laser",
      "lawyer",
      "lead",
      "lemon",
      "limousine",
      "leadlock",
      "log",
      "mammoth",
      "maple",
      "march",
      "mass",
      "mercury",
      "millionaire",
      "model",
      "mole",
      "moscow",
      "mouth",
      "mug",
      "needle",
      "net",
      "new york",
      "night",
      "note",
      "novel",
      "nurse",
      "nut",
      "oil",
      "olive",
      "olympus",
      "opera",
      "orange",
      "paper",
      "park",
      "part",
      "paste",
      "phoenix",
      "piano",
      "telescope",
      "teacher",
      "switch",
      "swing",
      "sub",
      "stick",
      "staff",
      "stadium",
      "sprint",
      "spike",
      "snowman",
      "slip",
      "shot",
      "shadow",
      "server",
      "ruler",
      "row",
      "rose",
      "root",
      "rome",
      "rock",
      "robot",
      "robin",
      "revolution",
      "rat",
      "racket",
      "queen",
      "press",
      "port",
      "pilot",
      "time",
      "tooth",
      "tower",
      "truck",
      "triangle",
      "trip",
      "turkey",
      "undertaker",
      "unicorn",
      "vacuum",
      "van",
      "wake",
      "wall",
      "war",
      "washer",
      "washington",
      "water",
      "wave",
      "well",
      "whale",
      "whip",
      "worm",
      "yard"
    ];

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    var shuffledBank = shuffle(wordBank);

    let arrayofWordObjects = [];
    let firstTeamWords = [];
    let secondTeamWords = [];
    let civilianWords = [];
    let assassinWord = [];

    for (let i = 0; i < 9; i++) {
      let obj = {
        word: shuffledBank[i],
        team: startTurn,
        clicked: false
      };

      arrayofWordObjects.push(obj);
      firstTeamWords.push(obj.word);
    }

    for (let j = 10; j < 18; j++) {
      let obj = {
        word: shuffledBank[j],
        team: secondTurn,
        clicked: false
      };

      arrayofWordObjects.push(obj);
      secondTeamWords.push(obj.word);
    }

    for (let k = 20; k < 27; k++) {
      let obj = {
        word: shuffledBank[k],
        team: "civilian",
        clicked: false
      };
      civilianWords.push(obj.word);
      arrayofWordObjects.push(obj);
    }

    for (let l = 30; l < 31; l++) {
      let obj = {
        word: shuffledBank[l],
        team: "assassin",
        clicked: false
      };

      assassinWord.push(obj.word);
      arrayofWordObjects.push(obj);
    }

    shuffle(arrayofWordObjects);

    let stateArray = [];

    for (let a = 0; a < 5; a++) {
      let row = arrayofWordObjects.splice(0, 5);
      stateArray.push(row);
    }

    this.state = {
      words: stateArray,

      firstTeamWords: firstTeamWords,
      secondTeamWords: secondTeamWords,
      civilianWords: civilianWords,
      assassinWord: assassinWord,

      turn: startTurn,
      firstTeam: startTurn,
      secondTeam: secondTurn,
      codeMasterView: false,
      guessPhase: false,
      guessesRemaining: 0,
      allDisabled: true,

      firstTeamScore: 9,
      secondTeamScore: 8,

      firstTeamClues: [],
      secondTeamClues: [],

      gameOver: false
    };

    this.flipCard = this.flipCard.bind(this);
    this.showClues = this.showClues.bind(this);
    this.addClue = this.addClue.bind(this);
    this.passTurn = this.passTurn.bind(this);
  }

  flipCard(clue) {
    const stateCopy = Object.assign({}, this.state);
    let turn = stateCopy.turn; //color
    let otherTeam;
    turn === "red" ? (otherTeam = "blue") : (otherTeam = "red");
    let copyFirstTeamScore = stateCopy.firstTeamScore;
    let copysecondTeamScore = stateCopy.secondTeamScore;
    let nextTurn = null;
    let guessCount = this.state.guessesRemaining;

    const wordListCopy = [...this.state.words];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (wordListCopy[i][j].word === clue) {
          if (wordListCopy[i][j].team === stateCopy.turn) {
            wordListCopy[i][j].clicked = true;
            turn === stateCopy.firstTeam ? copyFirstTeamScore-- : copysecondTeamScore--;
            turn === "red" ? (nextTurn = "red") : (nextTurn = "blue");
            guessCount--;
            this.setState({ guessesRemaining: guessCount });
          } else if (wordListCopy[i][j].team === otherTeam) {
            wordListCopy[i][j].clicked = true;
            turn === stateCopy.firstTeam ? copysecondTeamScore-- : copyFirstTeamScore--;
            turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");

            this.setState({
              guessPhase: false,
              allDisabled: true
            });
            break;
          } else if (wordListCopy[i][j].team === "civilian") {
            wordListCopy[i][j].clicked = true;
            turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");

            this.setState({
              guessPhase: false,
              allDisabled: true
            });
            break;
          } else if (wordListCopy[i][j].team === "assassin") {
            wordListCopy[i][j].clicked = true;

            this.setState({ gameOver: true, allDisabled: true });
            break;
          }
        }
      }

      this.setState({
        words: wordListCopy,
        firstTeamScore: copyFirstTeamScore,
        secondTeamScore: copysecondTeamScore,
        turn: nextTurn
      });
    }

    if (guessCount === 0) {
      this.setState({
        guessPhase: false,
        allDisabled: true,
        turn: otherTeam
      });
    }
  }

  showClues() {
    this.setState({
      codeMasterView: !this.state.codeMasterView
    });
  }

  addClue(clueObj) {
    if (this.state.turn === this.state.firstTeam) {
      let copyofClues = [...this.state.firstTeamClues];
      copyofClues.push(clueObj);
      this.setState({
        firstTeamClues: copyofClues,
        guessPhase: true,
        codeMasterView: false,
        guessPhase: true,
        allDisabled: false,
        guessesRemaining: clueObj.num
      });
    } else {
      let copyofClues = [...this.state.secondTeamClues];
      copyofClues.push(clueObj);
      this.setState({
        secondTeamClues: copyofClues,
        guessPhase: true,
        codeMasterView: false,
        guessPhase: true,
        allDisabled: false,
        guessesRemaining: clueObj.num
      });
    }
  }

  passTurn() {
    console.log("hello from parent");
    let nextTurn = null;
    this.state.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");

    this.setState({
      allDisabled: true,
      turn: nextTurn
    });
  }

  render() {
    return (
      <div className="App">
        <header className={`App-header clue-${this.state.codeMasterView ? "shown" : "hide"}`}>
          <div className="row" id="header-row">
            {this.state.codeMasterView ? (
              <TeamWordsComponent
                TeamWords={this.state.firstTeamWords}
                team={this.state.firstTeam}
                civilianWords={this.state.civilianWords}
                assassinWord={this.state.assassinWord}
              />
            ) : (
                <div className="col-md-4 clues" />
              )}

            <div className="col-md-4 ">
              <img src={logo} className="App-logo" alt="logo" onClick={() => this.showClues()} />
              <h1 className="App-title">Welcome to Codenames</h1>
            </div>

            {this.state.codeMasterView ? (
              <TeamWordsComponent
                TeamWords={this.state.secondTeamWords}
                team={this.state.secondTeam}
                civilianWords={this.state.civilianWords}
                assassinWord={this.state.assassinWord}
              />
            ) : (
                <div className="col-md-4 clues" />
              )}
          </div>
        </header>

        <div className="game-container">
          <ClueFormComponent codeMasterView={this.state.codeMasterView} giveClue={this.addClue} />
          <div className="row">
            <PlayerComponent
              name={this.state.firstTeam}
              score={this.state.firstTeamScore}
              clues={this.state.firstTeamClues}
              passTurn={this.passTurn}
              currentTurn={this.state.turn}
            />

            <div className="col-md-10">
              <div className="card-deck">
                {this.state.words[0].map((wordObj, index) => (
                  <CardComponent
                    clue={wordObj.word}
                    key={Math.floor(Math.random() * 10000) + 1}
                    team={wordObj.team}
                    clicked={wordObj.clicked}
                    flipCardFunction={this.flipCard}
                    disable={this.state.allDisabled}
                  />
                ))}
              </div>
              <div className="card-deck">
                {this.state.words[1].map((wordObj, index) => (
                  <CardComponent
                    clue={wordObj.word}
                    key={Math.floor(Math.random() * 10000) + 1}
                    team={wordObj.team}
                    clicked={wordObj.clicked}
                    flipCardFunction={this.flipCard}
                    disable={this.state.allDisabled}
                  />
                ))}
              </div>
              <div className="card-deck">
                {this.state.words[2].map((wordObj, index) => (
                  <CardComponent
                    clue={wordObj.word}
                    key={Math.floor(Math.random() * 10000) + 1}
                    team={wordObj.team}
                    clicked={wordObj.clicked}
                    flipCardFunction={this.flipCard}
                    disable={this.state.allDisabled}
                  />
                ))}
              </div>
              <div className="card-deck">
                {this.state.words[3].map((wordObj, index) => (
                  <CardComponent
                    clue={wordObj.word}
                    key={Math.floor(Math.random() * 10000) + 1}
                    team={wordObj.team}
                    clicked={wordObj.clicked}
                    flipCardFunction={this.flipCard}
                    disable={this.state.allDisabled}
                  />
                ))}
              </div>
              <div className="card-deck">
                {this.state.words[4].map((wordObj, index) => (
                  <CardComponent
                    clue={wordObj.word}
                    key={Math.floor(Math.random() * 10000) + 1}
                    team={wordObj.team}
                    clicked={wordObj.clicked}
                    flipCardFunction={this.flipCard}
                    disable={this.state.allDisabled}
                  />
                ))}
              </div>
            </div>

            <PlayerComponent
              name={this.state.secondTeam}
              score={this.state.secondTeamScore}
              clues={this.state.secondTeamClues}
              passTurn={this.passTurn}
              currentTurn={this.state.turn}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
