import { IsBoolean, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({
    message: ' *Le montant ne peux pas être vide',
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  by_month: boolean;
}
