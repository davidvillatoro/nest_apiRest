import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {

    //evaluar que el value ose el id sea un mongoId
    if ( !isValidObjectId(value)) {
      throw new BadRequestException( ` el ${value} no es MongoId Valido`);
    }

    return value;
  }

}
