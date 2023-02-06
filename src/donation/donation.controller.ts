import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Association } from 'src/association/entities/association.entity';
import { GetAsso, GetDonor } from 'src/auth/get-user.decorator';
import { UpdateDonorDto } from 'src/donor/dto/update-donor.dto';
import { Donor } from 'src/donor/entities/donor.entity';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entities/donation.entity';

@Controller('donation')
@UseGuards(AuthGuard())
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  create(
    @Body() createDonationDto: CreateDonationDto,
    @GetDonor() donor: Donor,
  ): Promise<Donation> {
    return this.donationService.create(createDonationDto, donor);
  }

  @Get()
  findAll(@GetDonor() donor: Donor): Promise<Donation[]> {
    return this.donationService.findAll(donor);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetDonor() donor: Donor,
  ): Promise<Donation> {
    return this.donationService.findOne(id, donor);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
    @GetDonor() donor: Donor,
  ): Promise<Donation | string> {
    return this.donationService.update(id, updateDonationDto, donor);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body()
    donor: Donor,
  ) {
    return this.donationService.remove(id, donor);
  }
}
