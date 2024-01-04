import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response-interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  
  //inyectamos el modelo de pokemon  para poder instertar los pokemos del modulo de seed al de pokemon
  constructor (
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>, 

    //llamar axios del adaptardor
    private readonly http: AxiosAdapter,
  ){}
  
  async executeSeed(){

    //-cada ves que insertemeos pokemons de nuevo bamos a borrar todo en la bbdd
    await this.pokemonModel.deleteMany();

    const data  = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=15`)

    //-------forma de insertar todos los pokemon de de un solo los 600 pokemons
    const pokemonToInsert: {name:string , no: number}[] =[];

    // este forEach nos sirve para sacar el name y url de la dara.result 
    data.results.forEach(({ name, url }) =>{

      const segments = url.split('/'); //aqui el split divide la url por "/" de moddo "api" "pokemon" "3"
      const no = +segments[ segments.length - 2 ]; // aqui el + es para hacer la convercionde string a  entero y  tomanos la pocion -2 que inicia de izquiera a derecha por el "-"


      //-----------CREACION DE LA SEMILLA EN EL MODULODE POKEMON
      //***const pokemon = await this.pokemonModel.create( {name, no})   

      pokemonToInsert.push(  {name, no} ); //el push crea un  unico arreglo con todos los objetos osea los pokemons 

      
    });

    await this.pokemonModel.insertMany( pokemonToInsert);

    return `Semilla realizada perfectamente`;
  }

}
