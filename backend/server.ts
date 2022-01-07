import 'dotenv/config';
import App from './app';
import config from 'config';
import logger from './util/logger';

const port = config.get('port');
const { app } = new App();

app.listen(port, async () => {
  logger.info(`Server Start~! ${port}`);
});
