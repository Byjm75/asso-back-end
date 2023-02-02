import { SetMetadata } from '@nestjs/common';

//Début de la mise en place de sécurité d'un role (user, admin)
export enum RoleEnumType {
  DONOR = 'donor',
  ASSOCIATION = 'association',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
