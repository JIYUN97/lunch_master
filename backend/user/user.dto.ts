import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  public email!: string;

  @IsString()
  public password!: string;

  @IsString()
  public slackToken?: string;
}
