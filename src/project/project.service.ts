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
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
  ) {}
  //-------------------Association créer un projet----------------------
  async createProject(
    idValue: string,
    createProjectDto: CreateProjectDto,
    association: Association,
  ): Promise<Project> {
    if (association.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à créer ce projet.",
      );
    }
    const existingProject = await this.projectRepository.findOne({
      where: [
        { topic: createProjectDto.topic },
        { body: createProjectDto.body },
      ],
    });
    if (existingProject) {
      throw new ConflictException('Le projet existe déjà !');
    }
    // Création de la donation avec les items de createDto
    const { topic, body } = createProjectDto;
    const project = new Project();
    project.topic = topic;
    project.body = body;
    project.association_ = association;

    return await this.projectRepository.save(project);
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
    const projectToUpdate = await this.projectRepository.findOne({
      where: { id: idValue },
    });
    //Je m'assure que seule cette association puisse modifier son projet
    if (!association || association.id !== projectToUpdate.association_.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    if (!projectToUpdate) {
      throw new NotFoundException("Le projet n'existe pas");
    }
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
    if (updateProjectDto.favoris) {
      projectToUpdate.favoris = favoris;
    }
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
