import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path'

import { DatabaseModule } from '../database/database.module';
import { ProductsService, PurchaseService } from '../services';
import { ProductsResolver, PurchaseResolver } from './graphql/resolvers'


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
    })
  ],
  providers: [ProductsService, PurchaseService, ProductsResolver, PurchaseResolver]
})
export class HttpModule { }
