import { SetMetadata } from '@nestjs/common';
// import { RoleEnumType } from 'src/association/entities/association.entity';
// import { RoleEnumType } from 'src/donor/entities/donor.entity';

//Début de la mise en place de sécurité d'un role (user, admin)
export enum RoleEnumType {
  DONOR = 'donor',
  ASSOCIATION = 'association',
  ADMIN = 'admin',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
