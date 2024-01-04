import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
 
   //importamos el modulo para llamar el esquema de pokemon
  imports:[
    ConfigModule, 
    MongooseModule.forFeature([
     { name:  Pokemon.name,
      schema: PokemonSchema,
    }
    ])
  ],
  exports: [  //exportamos el MongooseModulo para poder usar el crud en otros servicos rest
    MongooseModule  // esto exporta el modelo para ser consumido  
  ]

})
export class PokemonModule {}
