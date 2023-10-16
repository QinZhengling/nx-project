export class Res {
  code!: number;
  data!: {
    token: string;
    userId: string;
    roles: [];
  };
  msg!: string;
}
