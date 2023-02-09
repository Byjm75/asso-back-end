import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Association } from 'src/association/entities/association.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Association)
    private assoRepository: Repository<Association>,
  ) {}
  //-------------------Association créer un projet----------------------
  async createProject(
    // idValue: string,
    createProjectDto: CreateProjectDto,
    association_: Association,
  ): Promise<Project> {
    //Je m'assure que seule cette association puisse créer son projet
    // if (association_.id !== idValue) {
    //   throw new ForbiddenException(
    //     "Vous n'êtes pas autorisé à créer ce project.",
    //   );
    // }
    const newProject = await this.projectRepository.create({
      ...createProjectDto,
      association_,
    });
    try {
      const createdProject = await this.projectRepository.save(newProject);
      return createdProject;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('Le projet existe déja !');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // async findAll(): Promise<Project[]> {
  //   return await this.projectRepository.find();
  // }

  // async findOne(idValue: string): Promise<Project> {
  //   const projectFound = await this.projectRepository.findOneBy({
  //     id: idValue,
  //   });
  //   if (!projectFound) {
  //     throw new NotFoundException(
  //       `Project non trouvé avec le titre:${idValue}`,
  //     );
  //   }
  //   return projectFound;
  // }

  // async update(
  //   idValue: string,
  //   updateProjectDto: UpdateProjectDto,
  //   // association: Association,
  // ): Promise<Project | string> {
  //   console.log(idValue);
  //   // console.log('Association---------------!!!', association);
  //   const projectToUpdate = await this.findOne(idValue, association);
  //   if (updateProjectDto.id !== association.id) {
  //     throw new MethodNotAllowedException(
  //       "Vous n'êtes pas autorisé à modifier ces informations",
  //     );
  //   }
  //   console.log('id requête utilisateur---------------!!!', idValue);
  //   // console.log('id association-----------------------!!!', association.id);
  //   const project = await this.projectRepository.findOneBy({
  //     id: updateProjectDto.id,
  //   });
  //   console.log('TO UPDATE ', projectToUpdate);

  //   if (project.id !== updateProjectDto.id) {
  //     throw new MethodNotAllowedException(
  //       `Projet non trouvée avec l'id:${idValue}`,
  //     );
  //   }
  //   try {
  //     if (updateProjectDto.topic !== null) {
  //       projectToUpdate.topic = updateProjectDto.topic;
  //     }
  //     if (updateProjectDto.body !== null) {
  //       projectToUpdate.body = updateProjectDto.body;
  //     }
  //     if (updateProjectDto.url !== null) {
  //       projectToUpdate.url = updateProjectDto.url;
  //     }
  //     if (updateProjectDto.picture !== null) {
  //       projectToUpdate.picture = updateProjectDto.picture;
  //     }
  //     if (updateProjectDto.favoris !== null) {
  //       projectToUpdate.favoris = updateProjectDto.favoris;
  //     }
  //     return await this.projectRepository.save(projectToUpdate);
  //   } catch {
  //     throw new Error('autre erreur tâche');
  //   }
  // }

  // async remove(idValue: string): Promise<Project | string> {
  //   const result = await this.projectRepository.delete({
  //     id: idValue,
  //   });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(
  //       `Project non trouvé avec le titre:${idValue}`,
  //     );
  //   }
  //   return `Cette action entraine la suppresion du projet:${idValue}`;
  // }
}
