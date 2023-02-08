import { SetMetadata } from '@nestjs/common';

//Début de la mise en place de sécurité d'un role (donor, association)
export enum RoleEnumType {
  DONOR = 'donor',
  ASSOCIATION = 'asso',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
