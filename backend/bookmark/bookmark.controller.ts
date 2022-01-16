import { Router, Request, Response, response } from 'express';
import { validationMiddleware } from '../middleware';
import { BookmarkDto } from './bookmark.dto';
import { BookmarkService } from './bookmark.service';
import axios from 'axios';
import qs from 'qs';

export class BookmarkController {
  public router: Router;
  public path = '/bookmark';
  constructor(private readonly bookmarkService: BookmarkService) {
    this.router = Router();
    this.initRouter();
  }

  private initRouter(): void {
    this.router.post(`${this.path}/slack`, this.postSlack.bind(this));
    this.router.get(`${this.path}/random`, this.getRandomRestaurant.bind(this));
    this.router.post(
      this.path,
      validationMiddleware(BookmarkDto),
      this.createBookmark.bind(this),
    );
    this.router.get(`${this.path}/:userId`, this.getUserBookmark.bind(this));
  }

  async createBookmark(
    req: Request<any, any, BookmarkDto>,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const bookmark = await this.bookmarkService.create(req.body);
    return res.send({ success: 'ok', data: bookmark });
  }

  async getUserBookmark(
    req: Request<any, any, any>,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const bookmarks = await this.bookmarkService.getBookmark(req.params.userId);
    return res.send({ success: 'ok', data: bookmarks });
  }

  async getRandomRestaurant(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const headers = {
      'X-Naver-Client-Id': process.env.naverId || '',
      'X-Naver-Client-Secret': process.env.naverPassword || '',
    };
    const keyword = (req.query.keyword as string) || '';

    const url =
      'https://openapi.naver.com/v1/search/local.json?query=' +
      encodeURI(keyword) +
      '&display=5&start=1&sort=random';
    const { data } = await axios.get(url, { headers });
    if (!data.items.length) {
      return res.send({ success: false, msg: '맛집 검색에 실패하였습니다.' });
    }
    const restaurant = data.items;
    const randIndex = Math.floor(Math.random() * restaurant.length);
    return res.send({ success: 'ok', data: restaurant[randIndex] });
  }

  async postSlack(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    // JWT 토큰으로 로그인 여부 검사, 그 후로 로그인 정보 이용해서 토큰 및 채널 아이디 정보 확인
    const token = process.env.slack_token;
    const channel = process.env.channel_id;
    const { title, roadAddress } = req.body;
    const data = {
      'Content-Type': 'application/json;charset=UTF-8',
      token: token,
      channel: channel,
      text: `오늘의 점심!💖 ${title}에서 어때요? \n 주소는 바로 여기 -[${roadAddress}]📌`,
    };
    const result = await axios.post(
      'https://slack.com/api/chat.postMessage',
      qs.stringify(data),
    );
    if (!result.data.ok) {
      return res.send({ success: false, msg: '슬랙 전송에 실패하였습니다.' });
    }
    return res.send({ success: true, msg: '슬랙에 전송하였습니다.' });
  }
}
