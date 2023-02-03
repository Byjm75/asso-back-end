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
  findOne(
    @Param('id') id: string,
    @GetAsso() association: Association,
  ): Promise<Association> {
    return this.associationService.findOne(id, association);
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
}

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.associationService.remove(+id);
// }

//USER avec getUser
// @Get()
// findAll(@GetUser() user: Users) {
//   return this.exercicesService.findAll(user);
// }

// //USER avec getUser
// @Get(':id')
// findOne(@Param('id') id: string, @GetUser() user: Users) {
//   return this.exercicesService.findOne(+id, user);
// }

// //USER avec getUser
// @Patch(':id')
// update(
//   @Param('id') id: string,
//   @Body() updateExerciceDto: UpdateExerciceDto,
//   @GetUser() user: Users,
// ) {
//   return this.exercicesService.update(+id, updateExerciceDto, user);
// }

// //USER avec getUser
// @Delete(':id')
// remove(@Param('id') id: string, @GetUser() user: Users) {
//   return this.exercicesService.remove(+id, user);
// }
