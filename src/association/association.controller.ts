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
import { GetAsso } from 'src/auth/get-user.decorator';
import { AssociationService } from './association.service';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';

@Controller('asso')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get()
  findAllAsso(): Promise<Association[]> {
    return this.associationService.findAllAsso();
  }
  //-------------------------------------------------------
  @Get(':id')
  findOneAsso(@Param('id') id: string) {
    return this.associationService.findOneAsso(id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
    // @GetAsso() association: Association,
  ): Promise<Association> {
    return this.associationService.update(id, updateAssociationDto);
  }
  @Delete(':id')
  // @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.associationService.remove(id);
  }
}
