import 'dotenv/config';
import App from './app';
import config from 'config';
import logger from './util/logger';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkRepository } from './bookmark/bookmark.repository';
const port = config.get('port');
const { app } = new App([
  new UserController(new UserService(new UserRepository())), // 이게 맞을까??? IOC Container 이용해보자
  new BookmarkController(new BookmarkService(new BookmarkRepository())),
]);

app.listen(port, async () => {
  logger.info(`Server Start~! ${port}`);
});
