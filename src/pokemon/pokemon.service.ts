import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private defautlLimit: number;//varialbe global para la clase

  //injeccion de dependencias 
  constructor(
    @InjectModel(Pokemon.name) //esta es la forma de injectar en mongo 
    private readonly pokemonModel: Model<Pokemon>, // llamamos el model de Pokemon de las entitis 

    private readonly configService: ConfigService, 

  ){

    this.defautlLimit = configService.get<number>('defaultLimit'); //estamos estableciendo el valor de defautlimit del archivo        env.config.ts

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();//para que todo lo que se escriba sea en minuscula
    // el try ctahc es para que no se caiga el sercidor y solo se llame una ves
    try {

      const pokemon = await this.pokemonModel.create( createPokemonDto ); // para crear el pokemon la bbdd
      return pokemon;
      
    } catch (error) {

      this.manejoDeExcepcion( error);

    }
    
  }
  
  
  //paginacion del los pokemons ----------------
  findAll( paginationDto: PaginationDto ) {

    const { limit = this.defautlLimit , offset = 0} = paginationDto; //desestructuramos el los query parameters

    return this.pokemonModel.find()
    .limit( limit )
    .skip( offset)
    .sort( {
      no: 1  //esto ordena de manera asendente no ordena del "no"
    })
    .select('-__v')
  }


  
  async findOne(term: string) { // **************************Metodo que utilizamos en las otras enpoint **********************

    
    let pokemon: Pokemon;
    
    if( !isNaN(+term) ){ // isNaN debuelve un valor que no es un numero, por eso la "!" negacion, dise si esto es un numero
      
      pokemon = await this.pokemonModel.findOne( { no: term } ) // buscamos por el numero "no"  del pokemon
    }
    
    //MongoId
    if( !pokemon && isValidObjectId( term ) ){  //buscamos por id mongo  por eso la validacion
      
      pokemon = await this.pokemonModel.findById( term );
      
    }
    
    //Name
    if( !pokemon ){ 
      pokemon = await this.pokemonModel.findOne({ name : term.toLocaleLowerCase().trim()  }) // el "trim()" es para eliminar espacion adelante y atras
    }
    
    
    if( !pokemon ) throw new NotFoundException(` Pokemon con id, Nombre o NO "${term} no existe" `)
    
    return pokemon ;
  }
  
  //---------actualizar
  
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne( term )  // bamos actualizar y buscar con el metodo de arriba de get el " finone "
    
    if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne( updatePokemonDto,) // actualizar data
      return  { ...pokemon.toJSON(), ...updatePokemonDto};
      
    } catch (error) {

      this.manejoDeExcepcion( error );
      
    }

   /*  const resul =  { ...pokemon.toJSON(), ...updatePokemonDto};
   
   return resul; */
   
   // const pokemon = await this.pokemonModel.findByIdAndUpdate( term , updatePokemonDto);
   /*    
   const {name,no, _id} = pokemon;
   const result ={ name, no , id:_id}
   return result; */
  }
  
  async remove(id: string) {
    //this.pokemonModel.findByIdAndDelete( id ) 

  /*   const pokemon = await this.findOne( id );
     await pokemon.deleteOne(); // llamos el metod de arriba */

     const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

     if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon con id ${id} no existe`)
     }

     return; //regresara un tru o starus 200

  }
  
  
  //metodo para errores
  
  private manejoDeExcepcion( error: any ){
    
    if( error.code === 11000){
      throw new BadRequestException(`Pokemon ya existe en la bbdd ${ JSON.stringify( error.keyValue ) }`)
    }
    console.log(error);
    throw new InternalServerErrorException(` Creacion pokemon - revisar check log del server`)

  }
  
}
