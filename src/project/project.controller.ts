import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
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

  @Post('project')
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @GetAsso() association_: Association,
  ): Promise<Project> {
    console.log('project------------!!!', createProjectDto);
    return this.projectService.createProject(createProjectDto, association_);
  }
  //   @Get()
  //   findAll() {
  //     return this.projectService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.projectService.findOne(id);
  //   }

  //   @Patch(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateProjectDto: UpdateProjectDto,
  //     @GetUser() association: Association,
  //   ): Promise<Project | string> {
  //     return this.projectService.update(id, updateProjectDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.projectService.remove(id);
  //   }
}
