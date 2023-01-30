import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';

//création de la méthode Getuser
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): [Donor, Association] => {
    const req = ctx.switchToHttp().getRequest();
    const user: [Donor, Association] = {
      ...req.user,
    };
    return user;
  },
);
