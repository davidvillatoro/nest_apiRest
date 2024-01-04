import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {  // exportamos el documento de mongoose 

    // id : string == mongo ya lo da o lo crea automaticamente 

    @Prop({
        unique: true,
        index: true,
    })
    name: string;
    
    
    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}


export const PokemonSchema = SchemaFactory.createForClass( Pokemon ); //esportamos el esquema de la clase 