import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire pour connexion au comptes des roles.
export class LoginAssoDto {
  name: string;
  email: string;
  password: string;
  role: RoleEnumType;
}
