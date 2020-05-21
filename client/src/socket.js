
import io from 'socket.io-client';
import config from './config.json';

export default io(config.socket_url);
