import { mongoose } from '@typegoose/typegoose';
import { BookmarkDto } from './bookmark.dto';
import BookmarkModel, { Bookmark } from './bookmark.model';

export class BookmarkRepository {
  private readonly repository;
  constructor() {
    this.repository = BookmarkModel;
  }

  async create(input: BookmarkDto): Promise<Bookmark> {
    return this.repository.create(input);
  }

  async findByUser(
    user: mongoose.Types.ObjectId,
  ): Promise<Bookmark[] | undefined> {
    const Bookmark = await this.repository.find({ user });
    return Bookmark ?? undefined;
  }
}
