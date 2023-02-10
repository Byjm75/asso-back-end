import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { CreateDonationDto } from './create-donation.dto';

export class UpdateDonationDto extends PartialType(CreateDonationDto) {
  @IsOptional()
  @IsNumber()
  @Min(1, {
    message: ' *Le montant doit être de 10€ minimum',
  })
  amount: number;
  @IsOptional()
  @IsBoolean()
  by_month: boolean;
}
