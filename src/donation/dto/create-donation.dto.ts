import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({
    message: ' *Le montant ne peux pas être vide',
  })
  @IsNumber()
  @Min(1)
  amount: number;
  @IsBoolean()
  by_month: boolean;
}
