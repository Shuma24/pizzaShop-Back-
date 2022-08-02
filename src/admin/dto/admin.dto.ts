import { Expose } from 'class-transformer';

export class AdminDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: string;

  @Expose()
  access_token: string;
}
