import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { CreateDonationDto } from './create-donation.dto';

export class UpdateDonationDto extends PartialType(CreateDonationDto) {
  //------------------------------------------------------amount
  @IsOptional()
  @IsNumber()
  @Min(5, {
    message: ' *Le montant doit être de 5€ minimum',
  })
  amount: number;

  //------------------------------------------------------by_month
  @IsOptional()
  @IsBoolean()
  by_month: boolean;

  //--------------------------------------------------clé-étrangére-relation-table-project
  @IsUUID()
  project_id: string;
  //--------------------------------------------------clé-étrangére-relation-table-donor
  @IsUUID()
  donor_id: string;
}
