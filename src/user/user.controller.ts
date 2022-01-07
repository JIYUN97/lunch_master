import { Router } from 'express';
import { UserService } from './user.service';

export class UserController {
  public router: Router;
  constructor(private readonly userService: UserService) {
    this.router = Router();
  }
}
