import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import {MongooseModule} from "@nestjs/mongoose";
import { PhotoSchema } from "./photo.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Photo', schema: PhotoSchema }])],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
