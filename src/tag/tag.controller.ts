import {Controller, Get, Post, Body, Param,} from '@nestjs/common';
import { TagService } from "./tag.service";

@Controller('tag')
export class TagController {
    constructor(private readonly TagService: TagService) {}

    @Get()
    async getAllPhotos() {
        return await this.TagService.getTag();
    }
    @Get(':id')
    getPhoto(@Param('id') id: string) {
        return this.TagService.getSingleTag(id);
    }
    @Post()
    async addPhoto(
        @Body('title') TagTitle: string,

    ) {
        const generateId = await this.TagService.insertTag(
            TagTitle,
        );
        return { id: generateId };

    }
}
