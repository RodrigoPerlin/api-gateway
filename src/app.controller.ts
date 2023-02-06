import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:123456@localhost:5672'],
        queue: 'admin-backend',
      },
    });
  }
  @Post('categorias')
  async criarCategoria(@Body() CriarCategoriaDto: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit(
      'criar-categoria',
      CriarCategoriaDto,
    );
  }

  @Get('categorias')
  async consultarCategorias(@Query('idCategoria') _id: string) {
    return await this.clientAdminBackend.send(
      'consultar-categorias',
      _id ? _id : '',
    );
  }
}
