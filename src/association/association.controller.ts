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
// @UseGuards(AuthGuard())
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get()
  findAllAsso(): Promise<Association[]> {
    return this.associationService.findAllAsso();
  }
  //-------------------------------------------------------
  @Get(':id')
  findOneAsso(
    @Param('id') id: string,
    @GetAsso() association: Association,
  ): Promise<Association> {
    return this.associationService.findOneAsso(id, association);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
    @GetAsso() association: Association,
  ): Promise<Association> {
    console.log(association);
    return this.associationService.update(
      id,
      updateAssociationDto,
      association,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string, @GetAsso() association: Association) {
    return this.associationService.remove(id);
  }
}
