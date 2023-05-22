import {
  Field,
  HideField,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
// import { Role } from '@prisma/client';
import { BaseModel } from './base.model';

// registerEnumType(Role, {
//   name: 'Role',
//   description: 'User role',
// });

@ObjectType()
export class User extends BaseModel {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => String, { nullable: true })
  name: string | null;

  //   @Field(() => Role)
  //   role: Role;

  @HideField()
  password: string;
}
