import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GqlOptionsFactory } from '@nestjs/graphql';

import type { GraphqlConfig } from './config.interface';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    return {
      // schema options
      autoSchemaFile: graphqlConfig!.schemaDestination || './schema.graphql',
      sortSchema: graphqlConfig!.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // subscription
      installSubscriptionHandlers: true,
      includeStacktraceInErrorResponses: graphqlConfig!.debug,
      playground: graphqlConfig!.playgroundEnabled,
      context: ({ req }) => ({ req }),
    };
  }
}
