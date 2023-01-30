import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire pour connexion au comptes des roles.
export class LoginDto {
  pseudo: string;
  name: string;
  email: string;
  password: string;
  role: RoleEnumType;
}
