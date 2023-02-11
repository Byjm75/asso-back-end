import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetDonor } from 'src/auth/get-user.decorator';
import { Donor } from 'src/donor/entities/donor.entity';
import { ProjectService } from 'src/project/project.service';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entities/donation.entity';

@Controller('donation')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard('jwt'))
export class DonationController {
  constructor(private donationService: DonationService) {}
  //--------------Uniquement un donateur peut faire un don à un projet-----------------------
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createDonationDto: CreateDonationDto,
    @GetDonor() donor: Donor,
  ): Promise<Donation> {
    console.log('createDonationDto--controller---!!!', createDonationDto);
    console.log('donor--controller---!!!', donor);
    return this.donationService.createDon(id, createDonationDto, donor);
  }

  @Get()
  async find(id: string): Promise<Donation[]> {
    return this.donationService.findAllDonation(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Donation> {
    return this.donationService.findOneDonation(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
    @GetDonor() donor: Donor,
  ): Promise<Donation> {
    console.log('idddddd-Param-Controllers-------------!!!!!!!!!!', id);
    console.log(
      'updateDonationDto-Controllers------------!!!!!!!!!!',
      updateDonationDto,
    );
    console.log('@GetDonor-Controllers-------------!!!!!!!!!!', donor);
    return this.donationService.updateDonation(id, updateDonationDto, donor);
  }
}
//   @Delete(':id')
//   remove(
//     @Param('id') id: string,
//     @Body()
//     donor: Donor,
//   ) {
//     return this.donationService.remove(id, donor);
//   }
