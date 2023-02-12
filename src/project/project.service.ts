import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
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
  ) {}
  //-------------------Association créer un projet----------------------

  async createProject(
    idValue: string,
    createProjectDto: CreateProjectDto,
    association: Association,
  ): Promise<Project> {
    // Vérifie si l'ID de l'association passé dans la requête correspond à l'ID de l'association associée
    if (association.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à créer ce projet.",
      );
    }
    const newProject = await this.projectRepository.create({
      ...createProjectDto,
      association_: { id: idValue },
    });
    try {
      const createdProject = await this.projectRepository.save(newProject);
      return createdProject;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('Le projet existe déjà !');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  //Uniquement les utilisateurs connectés peuvent trouvés tous les projets.
  async findAllProject(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOneProject(idValue: string): Promise<Project> {
    const projectFound = await this.projectRepository.findOneBy({
      id: idValue,
    });
    if (!projectFound) {
      throw new NotFoundException(
        `Project non trouvé avec le titre:${idValue}`,
      );
    }
    return projectFound;
  }

  async updateProject(
    idValue: string,
    updateProjectDto: UpdateProjectDto,
    association: Association,
  ): Promise<Project> {
    console.log(idValue);
    console.log(
      'updateProjectDto-du-Service-------------!!!',
      updateProjectDto,
    );
    console.log('Association---------------!!!', association);
    console.log('IF-!!!association ||', association);
    console.log('IF-association.id !== idValue', association.id);
    const projectToUpdate = await this.projectRepository.findOne({
      where: { id: idValue },
    });
    //Je m'assure que seule cette association puisse modifier son profil
    if (!association || association.id !== projectToUpdate.association_.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    if (!projectToUpdate) {
      throw new NotFoundException("Le projet n'existe pas");
    }
    console.log('id requête project---!!!', idValue);
    console.log('projectToUpdate-Service---!!!', projectToUpdate);
    console.log('!!!projectToUpdate---!!!', !projectToUpdate);

    const { topic, body, website, picture, favoris } = updateProjectDto;
    if (updateProjectDto.topic) {
      projectToUpdate.topic = topic;
    }
    if (updateProjectDto.body) {
      projectToUpdate.body = body;
    }
    if (updateProjectDto.website) {
      projectToUpdate.website = website;
    }
    if (updateProjectDto.picture) {
      projectToUpdate.picture = picture;
    }
    if (updateProjectDto.favoris) {
      projectToUpdate.favoris = favoris;
    }
    console.log('return-projectRepository.save----!!!!', projectToUpdate);
    return await this.projectRepository.save(projectToUpdate);
  }

  async deleteProject(idValue: string, association: Association) {
    console.log('id-Service-------------!!!!!!!!!!', idValue);
    console.log('Association-Service-------------!!!!!!!!!!', association);
    const projectToDelete = await this.projectRepository.findOne({
      where: { id: idValue },
    });
    console.log('projectToDelete-Service--------------!!!', projectToDelete);
    if (!association || association.id !== projectToDelete.association_.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à supprimer ce projet",
      );
    }
    if (!projectToDelete) {
      throw new NotFoundException("Le projet n'existe pas");
    }
    await this.projectRepository.delete(idValue);
    return `Cette action a supprmé l'association #${idValue}`;
  }
}
