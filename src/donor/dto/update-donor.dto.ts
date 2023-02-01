import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorAuthDto } from 'src/auth/dto/create-donor.dto';
import { RoleEnumType } from '../entities/donor.entity';

export class UpdateDonorDto extends PartialType(CreateDonorAuthDto) {
  pseudo: string;
  surname: string;
  firstname: string;
  email: string;
  password: string;
  picture?: string;
  roleD: RoleEnumType.DONOR;
}
