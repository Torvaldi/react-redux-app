const redis = require('redis');
const { promisify } = require('util');
// Create Redis Client
let client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

client.on('connect', function(){
    console.log('Connected to Redis !');
});

client.on("error", function (err) {
    console.log("Error " + err);
});

const redisHelper = require('./helper/redis');

async function getUserScore(gameId, username){
    let result = await hgetAsync(redisHelper.gameScore(gameId), username);
    return result;
}

function setUserScore(gameId, username, value){
    client.hset(redisHelper.gameScore(gameId), username, value)
}

async function getAllUserScore(gameId){
    let result = await hgetallAsync(redisHelper.gameScore(gameId));
    return result;
}

async function getGameStatus(gameId){
    let result = await getAsync(redisHelper.currentStatus(gameId));
    return result;
}

function setScoreCounter(gameId, value){
    client.set(redisHelper.scoreCounter(gameId), 1);
}

async function getGameTurnNumber(gameId){
    return await getAsync(redisHelper.getTurnNumber(gameId));
}

async function getScoreCounter(gameId){
    let result = await getAsync(redisHelper.scoreCounter(gameId));
    return result;
}

function setScoreCounter(gameId, value){
    client.set(redisHelper.scoreCounter(gameId), value);
}

function setTurnNumber(gameId, turnNumber){
    client.set(redisHelper.getTurnNumber(gameId), turnNumber);
}

function setGameStatus(gameId, status){
    client.set(redisHelper.currentStatus(gameId), status)
}

module.exports = {
    client,
    getUserScore,
    setUserScore,
    getAllUserScore,
    getGameStatus,
    setScoreCounter,
    getGameTurnNumber,
    getScoreCounter,
    setTurnNumber,
    setGameStatus,
}