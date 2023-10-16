import { Role } from '../role';

export default interface IJwtPayload {
  account: string;
  id: string;
  roles: Role[];
}
