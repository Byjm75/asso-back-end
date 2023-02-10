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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Association } from 'src/association/entities/association.entity';
import { Project } from './entities/project.entity';
import { GetAsso } from 'src/auth/get-user.decorator';

@Controller('project')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  //--------------Uniquement une association peut créer un projet-----------------------
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createProjectDto: CreateProjectDto,
    @GetAsso() association: Association,
  ) {
    console.log('project------------!!!', createProjectDto);
    return this.projectService.createProject(id, createProjectDto, association);
  }
  @Get()
  findAll() {
    return this.projectService.findAllProject();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOneProject(id);
  }

  //Uniquement l'association avec son ID peut modifier son projet
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetAsso() association: Association,
  ): Promise<Project> {
    console.log('idddddd-Param-Controllers-------------!!!!!!!!!!', id);
    console.log(
      'UpdateProjetDto-Controllers------------!!!!!!!!!!',
      updateProjectDto,
    );
    console.log('@GetAsso-Controllers-------------!!!!!!!!!!', association);
    return this.projectService.updateProject(id, updateProjectDto, association);
  }

  //Uniquement l'association avec son ID peut supprimer son projet
  @Delete(':id')
  async delete(@Param('id') id: string, @GetAsso() association: Association) {
    console.log('id-Param-Controllers-------------!!!!!!!!!!', id);
    console.log('@GetAsso-Controllers-------------!!!!!!!!!!', association);
    return this.projectService.deleteProject(id, association);
  }
}
