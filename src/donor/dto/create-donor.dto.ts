import { RoleEnumType } from 'src/auth/roles.decorator';

export class CreateDonorDto {
  pseudo: string;
  email: string;
  password: string;
  picture: string;
  role: RoleEnumType;
}
