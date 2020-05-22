import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloseIcon from '@material-ui/icons/Close';
import './css/createGameForm.css';
import { withRouter } from 'react-router-dom';

import socketEvent from '../socketEvent.json';

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

    if(level > 3 || level < 1) return;
    if(answer > 15 || answer < 5) return;
    if(winningScore > 500 || winningScore < 10) return;

    this.props.onSubmit(token, level, answer, winningScore);

    const { io } = this.props;

    io.emit(socketEvent.NEW_GAME);

    this.props.history.push('/game/running');

  }

  render(){
    const { token, level, answer, winningScore, userRunningGame } = this.props;

    return(
      <section className="create_game_block">
        <article className="create_block_dark_background" onClick={this.props.openCreateGame()}></article>
        <article className="create_form_block">
          <section className="create_form_close_block">
              <CloseIcon className="create_form_close_icon" onClick={this.props.openCreateGame()} />
          </section>
          <section className="create_form_content">
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
                  variant="filled"
                  required
                  disabled={userRunningGame}
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
                  InputProps={{ inputProps: { min: 5, max: 15 } }}
                  margin="normal"
                  variant="filled"
                  required
                  disabled={userRunningGame}
                />
                <FormHelperText className="game_create_text">Number of answers of the mCQ ! Min: 5, Max: 15</FormHelperText>
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
                  variant="filled"
                  required
                  disabled={userRunningGame}
                />
                 <FormHelperText className="game_create_text">From 10 to 500</FormHelperText>
              </div>
              <div className="create_game_button">
                <Button type="submit" size="large" variant="contained" color="secondary" disabled={userRunningGame}>
                  Create
                </Button>
              </div>
            </form>
          </section>
        </article>
      </section>
    );
  }
    
}

let component = connect(mapStateToProps, mapDispatchToProps)(CreateGameForm);
export default withRouter(component);