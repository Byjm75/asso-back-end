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
import { AssociationService } from './association.service';
import { UpdateAssociationDto } from './dto/update-association.dto';

@Controller('association')
@UseGuards(AuthGuard())
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get(':id')
  findAll() {
    return this.associationService.findAll();
  }
  //-------------------------------------------------------
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
  ) {
    return this.associationService.update(+id, updateAssociationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associationService.remove(+id);
  }
}
