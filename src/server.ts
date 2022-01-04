import 'dotenv/config';
import * as http from 'http';
import App from './app';

const port = process.env.PORT || 5000;

const { app } = new App();

const server = http.createServer(app);

server.listen(port, async () => {
  console.log('Server Start~!');
});
