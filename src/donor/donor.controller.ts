import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonorService } from './donor.service';
import { UpdateDonorDto } from './dto/update-donor.dto';
@Controller('donor')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Get()
  findAll() {
    return this.donorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return this.donorService.update(+id, updateDonorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorService.remove(+id);
  }
}
