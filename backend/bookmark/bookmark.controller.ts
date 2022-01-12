import { Router, Request, Response } from 'express';
import { validationMiddleware } from '../middleware';
import { BookmarkDto } from './bookmark.dto';
import { BookmarkService } from './bookmark.service';
import axios from 'axios';

export class BookmarkController {
  public router: Router;
  public path = '/bookmark';
  constructor(private readonly bookmarkService: BookmarkService) {
    this.router = Router();
    this.initRouter();
  }

  private initRouter(): void {
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
    console.log(keyword);

    const url =
      'https://openapi.naver.com/v1/search/local.json?query=' +
      encodeURI(keyword) +
      '&display=5&start=1&sort=random';
    const { data } = await axios.get(url, { headers });
    return res.send({ success: 'ok', data: data.items });
  }
}
