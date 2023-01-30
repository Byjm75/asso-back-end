import { PartialType } from '@nestjs/mapped-types';
import { RoleEnumType } from 'src/auth/roles.decorator';
import { CreateDonorDto } from './create-donor.dto';

export class UpdateDonorDto extends PartialType(CreateDonorDto) {
  pseudo: string;
  email: string;
  password: string;
  picture: string;
  hashedPassword: string;
  role: RoleEnumType;
}
