import {Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { PhotoService } from "./photo.service";

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Get()
   async getAllPhotos() {
        return await this.photoService.getProducts();
    }
    @Get(':id')
    getPhoto(@Param('id') id: string) {
        return this.photoService.getSinglePhoto(id);
    }
    @Post()
    async addPhoto(
        @Body('title') photoTitle: string,
        @Body('tag') photoTag: string,
        @Body('url') photoUrl: string,
    ) {
        const generateId = await this.photoService.insertPhoto(
            photoTitle,
            photoTag,
            photoUrl
        );
        return { id: generateId };

    }
    @Patch(':id')
    async updatePhoto(
        @Param('id') id: string,
        @Body('title') title:string,
        @Body('tag') tag:string,
        @Body('url') url:string
    ){
    await this.photoService.updatePhoto(id, title, tag, url);
    return null;
    }
    @Delete(':id')
    async removePhoto(@Param('id') id: string){
        await this.photoService.deletePhoto(id);
        return null;
    }
}
