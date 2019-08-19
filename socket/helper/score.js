

function gameScore(gameId){
    return `score:${gameId}`;
}


function formatScore(scores){
  let playerName = Object.keys(scores);
  let playerScore = Object.values(scores)

  let count = 0;
  let result = playerName.map((value, index) => {
    count++;
    return {
      id: count,
      username: value, 
      value: parseInt(playerScore[index])
    }
  });
  return result;
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

function hashToJson(hash){
  let data = Object.keys(hash);
  let username = Object.values(hash)

  let result = data.map((value, index) => {
    return {
      data: JSON.parse(username[index])
    }
  });
  return result;
}

module.exports = {
    gameScore,
    formatScore,
    genereScore,
    hashToJson,
}