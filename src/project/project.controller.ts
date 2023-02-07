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
  create(
    @Body() createProjectDto: CreateProjectDto,
    // @GetAsso() association: Association,
  ) {
    console.log('project------------!!!', createProjectDto);
    return this.projectService.create(createProjectDto);
  }
  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  // @Get(':id')
  // findAllByAsso(@Param('id') association_: Association) {
  //   return this.projectService.findAllByAsso(association_);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProjectDto: UpdateProjectDto,
  //   // @GetAsso() association: Association,
  // ): Promise<Project | string> {
  //   return this.projectService.update(id, updateProjectDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
