import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
// import { GqlConfigService } from './gql-config.service';
import type { ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   useClass: GqlConfigService,
    //   imports: undefined,
    // }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      introspection: true,
      path: '/graphql',
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
