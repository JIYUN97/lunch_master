import { IsMongoId, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class BookmarkDto {
  @IsMongoId()
  public user!: Types.ObjectId;

  @IsString()
  public title!: string;

  @IsString()
  public address!: string;

  @IsString()
  public roadAddress!: string;

  @IsString()
  public category!: string;

  @IsString()
  @IsOptional()
  public link?: string;
}
