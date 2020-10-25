import io from "socket.io-client";
import appConfig from "./config";

export default io(appConfig.config.socket_url, { transports: ["websocket"] });
