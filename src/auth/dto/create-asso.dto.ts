import { IsEmail } from 'class-validator';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator/types/decorator/decorators';
import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire à la création d'un compte
export class CreateAssoAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  password: string;
  siret: string;
  rna: string;
  theme: string;
  url: string;
  body: string;
  picture: string;
  role: RoleEnumType;
}
