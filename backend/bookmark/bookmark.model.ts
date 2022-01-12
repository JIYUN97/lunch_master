import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from '../util/types/BaseModel';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Bookmark extends BaseModel {
  @prop({ required: true })
  user!: string;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  address!: string;

  @prop({ required: true })
  roadAddress!: string;

  @prop({ required: true })
  category!: string;

  @prop()
  link?: string;
}

const BookmarkModel = getModelForClass(Bookmark);
export default BookmarkModel;
