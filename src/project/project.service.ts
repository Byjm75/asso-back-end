import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    association: Association,
  ): Promise<Project | string> {
    const { topic } = createProjectDto;
    const query = this.projectRepository.createQueryBuilder();
    query.where({ topic }).andWhere({ association_: association });
    const existAlready = await query.getOne();

    if (existAlready !== null) {
      return `Vous avez déja crée le project avec le titre:${topic} ${association}`;
    }
    const newProject = await this.projectRepository.create({
      ...createProjectDto,
      association_: association,
    });
    try {
      if (createProjectDto.picture.length < 1) {
        newProject.picture =
          'https://www.lacourdespetits.com/wp-content/uploads/2015/12/logo_lacourdespetits.jpg';
      }
      console.log(createProjectDto.picture);
      if (createProjectDto.picture) {
        newProject.picture = createProjectDto.picture;
      }
      if (createProjectDto.topic) {
        newProject.topic = createProjectDto.topic;
      }
      if (createProjectDto.body) {
        newProject.body = createProjectDto.body;
      }
      if (createProjectDto.url) {
        newProject.url = createProjectDto.url;
      }
      if (createProjectDto.favoris) {
        newProject.favoris = createProjectDto.favoris;
      }
      return await this.projectRepository.save(newProject);
    } catch {
      throw new Error('erreur test');
    }
  }

  async findAllProject(association: Association): Promise<Project[]> {
    const projectFound = await this.projectRepository.findBy({
      association_: association,
    });
    console.log('projectFound', projectFound);
    if (!projectFound) {
      throw new NotFoundException(`Catérorie non trouvée`);
    }
    return projectFound;
  }

  async findOne(idValue: string, association: Association): Promise<Project> {
    const projectFound = await this.projectRepository.findOneBy({
      id: idValue,
      association_: association,
    });
    if (!projectFound) {
      throw new NotFoundException(
        `Project non trouvé avec le titre:${idValue}`,
      );
    }
    return projectFound;
  }

  async update(
    idValue: string,
    updateProjectDto: UpdateProjectDto,
    association: Association,
  ): Promise<Project | string> {
    console.log(idValue);
    console.log('Association---------------!!!', association);
    const { topic } = updateProjectDto;
    console.log('TITLE', topic);
    const query = this.projectRepository.createQueryBuilder();
    query.where({ topic }).andWhere({ association_: association });
    const existAlready = await query.getOne();
    console.log('updateeeeeee', existAlready);

    if (existAlready !== null) {
      return `Le project ${topic} existe déjà avec l'association ${association}`;
    }
    const query2 = this.projectRepository.createQueryBuilder();
    query2.where({ id: idValue }).andWhere({ association_: association });
    const projectToUpdate = await query2.getOne();
    console.log('TO UPDATE ', projectToUpdate);

    if (!projectToUpdate) {
      throw new NotFoundException(`Catégorie non trouvée avec l'id:${idValue}`);
    }

    try {
      if (updateProjectDto.topic !== null) {
        projectToUpdate.topic = updateProjectDto.topic;
      }
      if (updateProjectDto.body !== null) {
        projectToUpdate.body = updateProjectDto.body;
      }
      if (updateProjectDto.url !== null) {
        projectToUpdate.url = updateProjectDto.url;
      }
      if (updateProjectDto.picture !== null) {
        projectToUpdate.picture = updateProjectDto.picture;
      }
      if (updateProjectDto.favoris !== null) {
        projectToUpdate.favoris = updateProjectDto.favoris;
      }
      return await this.projectRepository.save(projectToUpdate);
    } catch {
      throw new Error('autre erreur tâche');
    }
  }

  async remove(
    idValue: string,
    association: Association,
  ): Promise<Project | string> {
    const result = await this.projectRepository.delete({
      association_: association,
      id: idValue,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Project non trouvé avec le titre:${idValue}`,
      );
    }
    return `Cette action entraine la suppresion du projet:${idValue}`;
  }
}
