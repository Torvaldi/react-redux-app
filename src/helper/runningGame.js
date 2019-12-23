export function getMoeLink(fileName){
    return 'https://animethemes.moe/video/' + fileName;
}

export function orderAnime(animes){
    animes.sort((a, b) => (a.nameJap > b.nameJap) ? 1 : -1);
    return animes;
}

export function getAnimeSeason(seasonNumber){
    if(seasonNumber === 1){
        return 'Winter';
    }

    if(seasonNumber === 2){
        return 'Spring';
    }

    if(seasonNumber === 3){
        return 'Summer';
    }

    return 'Fall';
}

export function getMusicType(type){
    if(type === 0){
        return 'Opening';
    }

    return 'Ending';
}

export function getAnimeType(type){
    if(type === 1){
        return 'TV';
    }

    if(type === 2){
        return 'OAV';
    }

    if(type === 3){
        return 'movie';
    }

    if(type === 4){
        return 'ONA';
    }

    return 'Special';
}

export function getMalUrl(malId){
    return 'https://myanimelist.net/anime/' + malId;
}

