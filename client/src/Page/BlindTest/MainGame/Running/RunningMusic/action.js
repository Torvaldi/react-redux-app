
export const CLICK_ANSWER = 'CLICK_ANSWER';
export const SET_ANSWER_ONCE = 'SET_ANSWER_ONCE';
export const RESET_ANIME_SELECT = 'RESET_ANIME_SELECT';

export function clickAnswer(animeSelect){
    return {
      type: CLICK_ANSWER,
      payload: { animeSelect },
    }
  }
  
export function setAnswerOnce(defaultValue){
  return {
    type: SET_ANSWER_ONCE,
    payload: defaultValue
  }
}

export function resetAnimeSelect(resetAnimeSelect){
  return {
    type: RESET_ANIME_SELECT,
    payload: resetAnimeSelect
  }
}