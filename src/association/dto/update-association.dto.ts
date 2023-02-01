import { PartialType } from '@nestjs/mapped-types';
import { CreateAssoAuthDto } from 'src/auth/dto/create-asso.dto';
import { RoleEnumType } from '../entities/association.entity';

export class UpdateAssociationDto extends PartialType(CreateAssoAuthDto) {
  name: string;
  email: string;
  password: string;
  siret: string;
  rna: string;
  theme: string;
  url: string;
  body: string;
  picture: string;
  roleA: RoleEnumType.ASSO;
}
