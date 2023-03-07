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
import { GetAsso } from 'src/auth/get-user.decorator';
import { AssociationService } from './association.service';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';

// localhost:8082/api/association
@Controller('association')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard())
export class AssociationController {
  constructor(private associationService: AssociationService) {}

  //Affiche toutes les associations de la BDD, tous roles.
  @Get()
  async findAll(): Promise<Association[]> {
    return this.associationService.findAllAsso();
  }

  // localhost:8082/api/association/id
  //Trouve une association via son id, tous roles
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Association> {
    console.log('1 Controller Param id---!!!', id);
    return this.associationService.findOneAsso(id);
  }

  //Uniquement l'association avec son ID peut modifier son profil
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
    @GetAsso() association: Association,
  ): Promise<Association> {
    console.log(
      '1 Controller Body updateAssociationDto---!!!',
      updateAssociationDto,
    );
    console.log('2 Controller GetAsso association---!!!', association);

    return this.associationService.updateAsso(
      id,
      updateAssociationDto,
      association,
    );
  }

  //Uniquement l'association avec son ID peut supprimer son profil
  @Delete(':id')
  async delete(@Param('id') id: string, @GetAsso() association: Association) {
    return this.associationService.deleteAsso(id, association);
  }
}
