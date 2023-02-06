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
import { GetAsso } from 'src/auth/get-user.decorator';
import { Association } from 'src/association/entities/association.entity';
import { Project } from './entities/project.entity';

@Controller('project')
// @UseGuards(AuthGuard())
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetAsso() association: Association,
  ): Promise<Project> {
    console.log('association------------!!!', association);
    return this.projectService.create(createProjectDto, association);
  }

  @Get()
  findAllProject(@GetAsso() association: Association): Promise<Project[]> {
    return this.projectService.findAllProject(association);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetAsso() association: Association,
  ): Promise<Project> {
    return this.projectService.findOne(id, association);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProjectDto: UpdateProjectDto,
  //   @GetAsso() association: Association,
  // ): Promise<Project | string> {
  //   return this.projectService.update(id, updateProjectDto, association);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
