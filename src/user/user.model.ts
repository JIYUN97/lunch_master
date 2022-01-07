import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import { logger } from '@typegoose/typegoose/lib/logSettings';

import bcrypt from 'bcrypt';
import { BaseModel } from '../util/types/BaseModel';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User extends BaseModel {
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop()
  slackToken?: string;

  async validatePassword(cadidatePassword: string): Promise<boolean> {
    try {
      return bcrypt.compare(cadidatePassword, this.password);
    } catch (e) {
      logger.error(e, 'Could not vaildate password');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
