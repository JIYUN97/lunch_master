//TODO: 임시 logger 사용 그냥 이뻐서.. 나중에 winston으로 바꿀 예정
import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level: 'info',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
