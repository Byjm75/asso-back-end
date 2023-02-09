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

@Controller('association')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard('jwt'))
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  //Fonctionne avec un jwt. Cela retourne bien un tableau des associations de la BBD.
  @Get()
  async findAll(): Promise<Association[]> {
    return this.associationService.findAllAsso();
  }
  //Trouve une association via son id que l'on soit donor ou association
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Association> {
    console.log('idddddd Controllers-------------!!!!!!!!!!', id);
    console.log('Promise Association-------------!!!!!!!!!!', Association);
    return this.associationService.findOneAsso(id);
  }

  //Uniquement l'association avec son ID peut modifier son profil
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto,
    @GetAsso() association: Association,
  ): Promise<Association> {
    console.log('idddddd-Param-Controllers-------------!!!!!!!!!!', id);
    console.log(
      'UpdateAssociationDto-Controllers------------!!!!!!!!!!',
      updateAssociationDto,
    );
    console.log('@GetAsso-Controllers-------------!!!!!!!!!!', association);
    return this.associationService.updateAsso(
      id,
      updateAssociationDto,
      association,
    );
  }

  //Uniquement l'association avec son ID peut supprimer son profil
  @Delete(':id')
  async delete(@Param('id') id: string, @GetAsso() association: Association) {
    console.log('idddddd-Param-Controllers-------------!!!!!!!!!!', id);
    console.log('association!!!!!', association);
    return this.associationService.deleteAsso(id, association);
  }
}
