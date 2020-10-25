const defaultApiUrl = "http://localhost:8000/";
const defaultPort = 5000;

const config = {
  api_url: process.env.API_URL || defaultApiUrl,
  port: process.env.PORT ? parseInt(process.env.PORT) : defaultPort,
  prod: process.env.NODE_ENV === "production",
};

module.exports = {
  config,
};
