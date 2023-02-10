import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetDonor } from 'src/auth/get-user.decorator';
import { Donor } from 'src/donor/entities/donor.entity';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entities/donation.entity';

@Controller('donation')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard('jwt'))
export class DonationController {
  constructor(private readonly donationService: DonationService) {}
  //--------------Uniquement un donateur peut faire un don à un projet-----------------------
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createDonationDto: CreateDonationDto,
    @GetDonor() donor: Donor,
  ) {
    console.log('donateur------------!!!', donor);
    return this.donationService.createDon(id, createDonationDto, donor);
  }

  //   @Get()
  //   findAll(@GetUser() donor: Donor): Promise<Donation[]> {
  //     return this.donationService.findAll(donor);
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string, @GetUser() donor: Donor): Promise<Donation> {
  //     return this.donationService.findOne(id, donor);
  //   }

  //   @Patch(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateDonationDto: UpdateDonationDto,
  //     @GetUser() donor: Donor,
  //   ): Promise<Donation | string> {
  //     return this.donationService.update(id, updateDonationDto, donor);
  //   }

  //   @Delete(':id')
  //   remove(
  //     @Param('id') id: string,
  //     @Body()
  //     donor: Donor,
  //   ) {
  //     return this.donationService.remove(id, donor);
  //   }
}
