import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetDonor } from 'src/auth/get-user.decorator';
import { DonorService } from './donor.service';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './entities/donor.entity';

// localhost:8082/api/donor
@Controller('donor')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard())
export class DonorController {
  constructor(private donorService: DonorService) {}

  // localhost:8082/api/donor/id
  //Trouve un donateur via son id que l'on soit donor ou association connectés.
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Donor> {
    console.log('1 Controller Param id---!!!', id);
    return this.donorService.findOneDonor(id);
  }

  //Uniquement le donateur avec son ID peut modifier son profil
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonorDto: UpdateDonorDto,
    @GetDonor() donor: Donor,
  ): Promise<Donor> {
    console.log('1 Controller Body updateDonorDto---!!!', updateDonorDto);
    console.log('2 Controller GetDonor donor---!!!', donor);
    return this.donorService.updateDonor(id, updateDonorDto, donor);
  }

  //Uniquement le donateur avec son ID peut supprimer son profil
  @Delete('/:id')
  async delete(@Param('id') id: string, @GetDonor() donor: Donor) {
    return this.donorService.deleteDonor(id, donor);
  }

  //--------------------------------------------ADMIN------------------
  // Uniquement un admin peut avoir l'ensemble des donateurs
  //   @Get('admin')
  //   findAll(): Promise<Donor[]> {
  //     return this.donorService.findAllDonor();
  //   }
}
