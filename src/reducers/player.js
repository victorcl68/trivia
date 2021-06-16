// import { defineState } from 'redux-localstore';

const defaultState = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const INITIAL_STATE = defaultState;

export default (state = INITIAL_STATE, action) => {
  let player = {
    score: 0,
    assertions: 0,
  };

  switch (action.type) {
  case 'LOGIN':
    localStorage.setItem('state', JSON.stringify({ player }));
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
      score: 0,
    };
  case 'SET_SCORE':
    player = {
      score: action.state.score,
      assertions: action.state.assertions,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    return {
      ...state,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  default:
    return state;
  }
};
