
export const CLICK_ANSWER = 'CLICK_ANSWER';
export const SET_ANSWER_ONCE = 'SET_ANSWER_ONCE';

export function clickAnswer(findAnime){
    return {
      type: CLICK_ANSWER,
      payload: { findAnime },
    }
  }
  
export function setAnswerOnce(defaultValue){
  return {
    type: SET_ANSWER_ONCE,
    payload: defaultValue
  }
}