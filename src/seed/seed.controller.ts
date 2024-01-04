import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  //borromos todos los endpoints  y solo dejamos este get 

  @Get()
  ExecuteSEED() {
    return this.seedService.executeSeed(); //creacion del servicio 
  }

 
}
