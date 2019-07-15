
export const getGameStatus = (statusId) => {
    console.log(statusId)
    if(statusId == 1){
        return "Waiting for player";
    }

    if(statusId == 2){
        return "Running";
    }

    if(statusId == 3){
        return "Finish";
    }

}