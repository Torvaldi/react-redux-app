

function gameScore(gameId){
    return `score:${gameId}`;
}

function scoreCounter(gameid){
  return `scoreCounter:${gameid}`;
}

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

function hashToJson(hash, turnNumber){
  let data = Object.keys(hash);
  let username = Object.values(hash)

  let globalScore = data.map((value, index) => {
    let user = JSON.parse(username[index]);
    return {
      data: {
        username: user.username,
        score: user.score,
      }
    }
  });

  let turnScore = data.map((value, index) => {
    let user = JSON.parse(username[index]);
    if(user.turnNumber === turnNumber){
      return {
        data: {
          username: user.username,
          turnScore: user.scoreTurn,
          rank: user.rank
        }
      }
    } else {
      return {
        data: {
          username: user.username,
          turnScore: 0,
          rank: user.rank
        }
      }
    }
  });

  return { globalScore, turnScore };
}

module.exports = {
    gameScore,
    scoreCounter,
    genereScore,
    hashToJson,
}