// API ENDPOINT

import appConfig from "./config";

export const API_LOGIN = appConfig.config.api_url + "api/login";
export const API_REGISTER = appConfig.config.api_url + "api/register";
export const API_LOAD_GAME_BY_STATUS =
  appConfig.config.api_url + "api/game.status";
export const API_USER_JOIN_GAME = appConfig.config.api_url + "api/game.join";
export const API_USER_RUNNING_GAME =
  appConfig.config.api_url + "api/game.user.running";
export const API_NEW_GAME = appConfig.config.api_url + "api/game.create";
export const API_USER_GAME = appConfig.config.api_url + "api/game.user";
export const API_USER_LEAVE = appConfig.config.api_url + "api/game.user.leave";

// API header
export const getAuthorizationHeader = (token) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    token: token,
  };
};

export const getCrosHeader = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};
