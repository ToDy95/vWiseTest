import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { PhotoModule } from './photo/photo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TagModule,
    PhotoModule,
    MongooseModule.forRoot('mongodb+srv://vWise:vWise123@vwise.lxlltq1.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
