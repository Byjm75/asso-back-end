import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { RoleEnumType, Roles } from 'src/auth/roles.decorator';
import { Donor } from 'src/donor/entities/donor.entity';
import { AssociationService } from './association.service';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Get()
  findAllAsso(): Promise<Association[]> {
    return this.associationService.findAllAsso();
  }
  //-------------------------------------------------------
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneAsso(
    @Param('id') id: string,
    @GetUser() user: Donor | Association,
  ): Promise<Association> {
    return this.associationService.findOneAsso(id, user);
  }

  // @Get(':id')
  // findOneAsso(@Param('id') id: string) {
  //   return this.associationService.findOneAsso(id);
  // }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateAssociation(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
  ) {
    return this.associationService.update(id, updateAssociationDto);
  }
}
// @Patch(':id')
// @UseGuards(AuthGuard())
// async updateAssociation(
//   @Param('id') id: string,
//   @Body() updateAssociationDto: UpdateAssociationDto,
//   @GetUser() association: Association,
// ): Promise<Association> {
//   console.log('getuser asso.Asso!!!!!!!!!!!!!!!!', association);
//   return this.associationService.updateAssociation(
//     id,
//     updateAssociationDto,
//     association,
//   );
// }
// @Delete(':id')
// @UseGuards(AuthGuard())
// remove(@Param('id') id: string, @GetUser() association: Association) {
//   return this.associationService.remove(id, association);
// }
//}
