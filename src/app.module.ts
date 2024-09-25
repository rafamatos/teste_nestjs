import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { geralModule } from './app/module/geral.module';


@Module({
  imports: [geralModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
