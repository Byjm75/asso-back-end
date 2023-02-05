import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetDonor } from 'src/auth/get-user.decorator';
import { DonorService } from './donor.service';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './entities/donor.entity';
@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Get()
  findAllDonor(): Promise<Donor[]> {
    return this.donorService.findAllDonor();
  }

  @Get(':id')
  findOneDonor(
    @Param('id') id: string,
    @GetDonor() donor: Donor,
  ): Promise<Donor> {
    return this.donorService.findOneDonor(id, donor);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonorDto: UpdateDonorDto,
    @GetDonor() donor: Donor,
  ): Promise<Donor> {
    console.log(donor);
    return this.donorService.update(id, updateDonorDto, donor);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetDonor() donor: Donor) {
    return this.donorService.remove(id);
  }
}
