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
import { DonorService } from './donor.service';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './entities/donor.entity';
@Controller('donor')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard('jwt'))
export class DonorController {
  constructor(private readonly donorService: DonorService) {}
  //Trouve un donateur via son id que l'on soit donor ou association connectés.
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Donor> {
    console.log('idddddd Controllers-------------!!!!!!!!!!', id);
    console.log('Promise DONOR-------------!!!!!!!!!!', Donor);
    return this.donorService.findOneDonor(id);
  }

  //Uniquement le donateur avec son ID peut modifier son profil (@GetDonor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonorDto: UpdateDonorDto,
    @GetDonor() donor: Donor,
  ): Promise<Donor> {
    console.log('@GetDonor() donor: Donor---------------!!!!!!!', donor);
    return this.donorService.update(id, updateDonorDto, donor);
  }

  //Uniquement le donateur avec son ID peut supprimer son profil
  @Delete(':id')
  async delete(@Param('id') id: string, @GetDonor() donor: Donor) {
    console.log('idddddd-Param-Controllers-------------!!!!!!!!!!', id);
    console.log('association!!!!!', donor);
    return this.donorService.deleteDonor(id, donor);
  }
  //--------------------------------------------ADMIN------------------
  // Uniquement un admin peut avoir l'ensemble des donateurs
  //   @Get('admin')
  //   findAll(): Promise<Donor[]> {
  //     return this.donorService.findAllDonor();
  //   }
}
