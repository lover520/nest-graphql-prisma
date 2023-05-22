import { PrismaClient } from '@prisma/client';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './app.model';
const prisma = new PrismaClient();
@Resolver(() => User)
export class AppResolver {
  @Query(() => User)
  async getOneUser(@Args('id') id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log(user);
    return user;
  }
}
