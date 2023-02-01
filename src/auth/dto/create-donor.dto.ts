import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire à la création d'un compte
export class CreateDonorAuthDto {
  pseudo: string;
  surname: string;
  firstname: string;
  email: string;
  password: string;
  picture?: string;
  role: RoleEnumType;
}
