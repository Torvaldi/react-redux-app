

/**
 * @param {*int} rank,
 * @return {*int} score
 */
function genereScore(rank){
  if(rank === 1){
    return 4;
  }

  if(rank === 2){
    return 3
  }

  if(rank === 3){
    return 2;
  }

  return 1;
}

/**
 * Parse redis hash to json formatted data
 * @param {*} hash redis has result
 * @param {*} turnNumber number of turn
 */
function hashToJson(hash, turnNumber){
  let data = Object.keys(hash);
  let username = Object.values(hash);

  // represent players with their scores
  let globalScore = data.map((value, index) => {
    let user = JSON.parse(username[index]);
    return {
        username: user.username,
        score: user.score,
    }
  });

  // represent players with their score of the current turn
  let turnScore = data.map((value, index) => {
    let user = JSON.parse(username[index]);
    // check if the player has anwser to the QCM during the turn
    if(user.turnNumber === turnNumber){
      return {
          username: user.username,
          turnScore: user.scoreTurn,
          rank: user.rank,
          anime: user.anime
      }
    } else {
      return {
          username: user.username,
          turnScore: 0,
          rank: 0,
      }
    }
  });

  return { globalScore, turnScore };
}

module.exports = {
    genereScore,
    hashToJson,
}