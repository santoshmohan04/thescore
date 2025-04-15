import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './controllers/games.controller';
import { EmployeeModule } from './employee.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://tagore412:SivTckoe6rgEiDYv@cluster0.jebdamj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), EmployeeModule],
  controllers: [AppController, GamesController],
  providers: [AppService],
})
export class AppModule {}
