import React from "react";


class ClueFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clue: "",
      clueNum: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNum = this.handleChangeNum.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      clue: e.target.value
    });
  }

  handleChangeNum(e) {
    this.setState({
      clueNum: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.giveClue({
      clue: this.state.clue,
      num: this.state.clueNum
    });
  }

  render() {
    const CMview = (
      <form onSubmit= { this.handleSubmit }>
      <div className="form-group row fade-in">
        <div className="col-3" />
        <div className="col-6">
          <div className="row">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                id="clue-input-field"
                placeholder="Type your 1 word clue here"
                onChange={ this.handleChange }
              />
            </div>
          <div className="col-md-2">
            <input type="text" className="form-control" id="clueNum-input-field" placeholder="#" onChange={ this.handleChangeNum }/>
          </div>
            <div className="col-md-4">
              <button type="submit" 
              className="btn btn-primary"
              onClick = { this.handleSubmit }>
                Give Clue
              </button>
            </div>
          </div>
        </div>
        <div className="col-3" />
      </div>
      </form>
    );

    const playerView = (
      <div disabled className="form-group row">
        <div className="col-3" />
        <div className="col-6">
          <input className="form-control" type="text" id="clue-input-field" disabled />
        </div>
        <div className="col-3" />
      </div>
    );

    let view = null;

    this.props.codeMasterView ? (view = CMview) : (view = playerView);

    return view;
  }
}

export default ClueFormComponent;
