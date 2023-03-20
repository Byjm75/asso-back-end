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

// localhost:8082/api/donation
@Controller('donation')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard())
export class DonationController {
  constructor(private donationService: DonationService) {}

  //--------------Uniquement un donateur peut faire un don à un projet
  // localhost:8082/api/donation/id
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createDonationDto: CreateDonationDto,
    @GetDonor() donor: Donor,
  ): Promise<Donation> {
    console.log('1 Controller Param id---!!!', id);
    console.log('2 Controller Body createDonationDto---!!!', createDonationDto);
    console.log('3 Controller GetDonor---!!!', donor);
    return this.donationService.createDon(id, createDonationDto, donor);
  }
  @Get()
  async findAll() {
    console.log('1 Controller GetDonor---!!!');
    return this.donationService.findAllDonation();
  }

  // localhost:8082/api/donation/id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Donation> {
    console.log('1 Controller Param id---!!!', id);
    return this.donationService.findOneDonation(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
    @GetDonor() donor: Donor,
  ): Promise<Donation> {
    console.log('1 Controller Param id---!!!', id);
    console.log(
      '2 Controller Body updateAssociationDto---!!!',
      updateDonationDto,
    );
    console.log('3 Controller GetDonor association---!!!', donor);
    return this.donationService.updateDonation(id, updateDonationDto, donor);
  }

  //Uniquement le donateur avec son ID peut supprimer son profil
  @Delete(':id')
  async delete(@Param('id') id: string, @GetDonor() donor: Donor) {
    return this.donationService.deleteDonation(id, donor);
  }
}
