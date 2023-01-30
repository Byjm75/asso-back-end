import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

//ICI je confirgure les éléments de la table qui peuvent être modifiés.
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  topic: string;
  body: string;
  picture: string;
}
