import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({

    providers: [ AxiosAdapter], //creacion del provider para axios
    exports: [AxiosAdapter] //exporta el modulo para que lo puedan injectar los demas modulos

})
export class CommonModule {}
