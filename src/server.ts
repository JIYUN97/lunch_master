import 'dotenv/config';
import * as http from 'http';
import App from './app';

// 제 컴퓨터에서 이미 500번 포트를 사용하고있어서 삼천으로 바꿨습니다..
const port = process.env.PORT || 3000;

const { app } = new App();

const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`Server Start~! http://localhost:${port}`);
});
