const defaultApiURL = "http://localhost:8000/";
const defaultSecretKey = "yoursuperkey";
const defaultSocketURL = "http://localhost:5000/";

const config = {
  api_url: process.env.API_URL ? process.env.API_URL : defaultApiURL,
  secret_key: process.env.SECRET_KEY
    ? process.env.SECRET_KEY
    : defaultSecretKey,
  socket_url: process.env.SOCKET_URL
    ? process.env.SOCKET_URL
    : defaultSocketURL,
};

module.exports = {
  config,
};
