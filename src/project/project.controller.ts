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

// localhost:8082/api/project
@Controller('project')
//Toutes les routes sont accessibles uniquement avec un Token
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  //Un projet peut-être uniquement crée par une association
  // localhost:8082/api/project/id
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createProjectDto: CreateProjectDto,
    @GetAsso() association: Association,
  ): Promise<Project> {
    console.log('1 Controller Body---!!!', createProjectDto);
    console.log('2 Controller GetDonor---!!!', association);
    return this.projectService.createProject(id, createProjectDto, association);
  }
  @Get()
  async findAll() {
    return this.projectService.findAllProject();
  }

  // localhost:8082/api/project/id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOneProject(id);
  }

  //Uniquement l'association avec son ID peut modifier son projet
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetAsso() association: Association,
  ): Promise<Project> {
    console.log('1 Controller Param id---!!!', id);
    console.log('2 Controller Body updateProjectDto---!!!', updateProjectDto);
    console.log('3 Controller GetDonor association---!!!', association);
    return this.projectService.updateProject(id, updateProjectDto, association);
  }

  //Uniquement l'association avec son ID peut supprimer son projet
  @Delete(':id')
  async delete(@Param('id') id: string, @GetAsso() association: Association) {
    return this.projectService.deleteProject(id, association);
  }
}
