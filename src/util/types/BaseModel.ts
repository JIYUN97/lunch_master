import { mongoose } from '@typegoose/typegoose';
import { Dayjs } from 'dayjs';

export abstract class BaseModel {
  createAt!: Dayjs;
  updatedAt!: Dayjs;
  _id!: mongoose.Types.ObjectId;
  __v!: number;
}
