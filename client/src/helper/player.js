
/**
 * retrives score and rank of the players array
 * if not result are found return rank and score wiith both 0 as a value 
 * @param {*array} players 
 * @param {*string} userName
 * @return {object} 
 */
export const getAuthUserTurnInfo = (players, userName) => {

    let player = players.find(player => player.userName === userName);
    
    let rank = 0;
    let score = 0;

    if(player !== undefined){
        rank = player.rank;
        score = player.score
    }

    return {
        rank: rank,
        score: score
    }
}