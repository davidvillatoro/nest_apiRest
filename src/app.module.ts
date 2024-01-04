import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';


@Module({
  imports: [

    //----------configuraciones de variable de entorno siempre ban al inicio--para que puedan aparecer la env 
    ConfigModule.forRoot({
      load: [ EnvConfiguration ], //cargarn el archivo "env.configuration.ts"
      validationSchema: JoiValidationSchema, //para usar el "Join" y el archivo "joi.validation.js"
    }),

    // modulo para servir sito estatico en el localhost
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

      //cadena de coneccion a mongo o la bbdd 
      MongooseModule.forRoot( process.env.MONGODB),

      PokemonModule,

      CommonModule,

      SeedModule
    
  ],

})
export class AppModule {}
