export class CreateAuthDto {
  id!: string;
  username!: string;
  account!: string;
  password!: string;
  sex!: number;
  age!: number;
  role!: [];
  create_time!: Date;
  create_user!: string;
  update_time!: Date;
  update_user!: string;
}
