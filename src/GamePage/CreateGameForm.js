import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import './css/createGameForm.css';

import { 
  changeLevel, 
  changeAnswer, 
  changeWinningScore, 
  storeGame 
} from '../actions/game';

const mapStateToProps = (state, ownProps) => ({...state.game, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onChangeLevel:  (level) =>
    dispatch(changeLevel(level)),
  onChangeAnswer: (answer) =>
    dispatch(changeAnswer(answer)),
  onChangeWinningScore: (winningScore) =>
    dispatch(changeWinningScore(winningScore)),
  onSubmit: (token, level, answer, winningScore) =>
    storeGame(dispatch, token, {level, answer, winningScore}),
});

class CreateGameForm extends Component {

  changeLevel = (event) => this.props.onChangeLevel(event.target.value);
  changeAnswer = (event) => this.props.onChangeAnswer(event.target.value);
  changeWinningScore = (event) => this.props.onChangeWinningScore(event.target.value);

  /**
   * @param {*string} token, auth token
   * @param {*string} level, game level
   * @param {*string} answer, number of the mCQ answer
   * @param {*string} winningScore, score needed to win the game
   */
  submitForm = (token, level, answer, winningScore) => (event) => {
    event.preventDefault();
    if(level && answer && winningScore){
      this.props.onSubmit(token, level, answer, winningScore);
    }
  }

  render(){
    const { token, level, answer, winningScore, userCreateGame } = this.props;

    if(userCreateGame === true){
      return <Redirect to="game/running" />
    }

    return (
      <Fragment>
        <h2 className="title_create_game">Create Game</h2>
        <p className="text_create_game">You want to create your own game ? </p>
        <form className="form_create_game" onSubmit={this.submitForm(token, level, answer, winningScore)} >
          <div className="form_create_game_field">
            <TextField
              id="outlined-number"
              label="Level"
              type="number"
              className="game_create_field"
              onChange={this.changeLevel}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: 1, max: 3 } }}
              margin="normal"
              variant="outlined"
              required
            />
            <FormHelperText className="game_create_text" >The smaller is it, the more famous the animes are</FormHelperText>
          </div>
          <div className="form_create_game_field">
            <TextField
              id="outlined-number"
              label="Answers"
              type="number"
              className="game_create_field"
              onChange={this.changeAnswer}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: 4, max: 15 } }}
              margin="normal"
              variant="outlined"
              required
            />
            <FormHelperText className="game_create_text">Number of answers of the mCQ ! Min: 4, Max: 15</FormHelperText>
          </div>
          <div className="form_create_game_field">
            <TextField
              id="outlined-number"
              label="Winning Score"
              type="number"
              className="game_create_field"
              onChange={this.changeWinningScore}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: 10 } }}
              margin="normal"
              variant="outlined"
              required
            />
          </div>
          <div className="create_game_button">
            <div>
            <Button type="submit" size="large" variant="contained" color="primary">
              Create
            </Button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm);
