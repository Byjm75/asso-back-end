import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire pour connexion au comptes des roles.
export class LoginDonorDto {
  pseudo: string;
  email: string;
  password: string;
  picture: string;
  role: RoleEnumType;
}
