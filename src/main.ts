import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { geralModule } from './app/module/geral.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.enableCors();



  const swagger_geral_config = new DocumentBuilder()
    .setTitle('Exemplo da api')
    .setDescription('descrição da API')
    .setVersion('1.0')
    .addTag('geral')
    .build();

  const newAcessoDocument = SwaggerModule.createDocument(app, swagger_geral_config, {
    include: [geralModule],
  });

  SwaggerModule.setup('geral', app, newAcessoDocument);

  //###############################################################################

  await app.listen(3000);
}
bootstrap();
