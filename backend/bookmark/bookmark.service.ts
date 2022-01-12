import { mongoose } from '@typegoose/typegoose';
import { BookmarkDto } from './bookmark.dto';
import { Bookmark } from './bookmark.model';
import { BookmarkRepository } from './bookmark.repository';

export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  create(input: BookmarkDto): Promise<Bookmark> {
    return this.bookmarkRepository.create(input);
  }

  getBookmark(input: mongoose.Types.ObjectId): Promise<Bookmark[] | undefined> {
    return this.bookmarkRepository.findByUser(input);
  }
}
