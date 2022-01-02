import "dotenv/config";
import App from "./app";
import * as http from "http";

const port = process.env.PORT || 5000;

const app = new App().app;

const server = http.createServer(app);

server.listen(port, async function () {
  console.log("Server Start~!");
});
