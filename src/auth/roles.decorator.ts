import { SetMetadata } from '@nestjs/common';

//  2 RoleEnumType pour 2 utilsateurs distinct
export enum RoleEnumType {
  DONOR = 'donor',
  ASSOCIATION = 'asso',
  //ADMIN = 'admin'
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
