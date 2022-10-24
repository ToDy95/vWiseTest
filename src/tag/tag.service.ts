import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";
import { Tag } from './tag.model'

@Injectable()
export class TagService {
    private tag: Tag[] = [];
    constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

    async insertTag(title: string) {
        const newTag = new this.tagModel({
            title,
        });
        const result = await newTag.save();
        return result.id as string;
    }
    async getTag() {
        const restul = await this.tagModel.find().exec();
        return restul.map((p) => ({id: p.id, title: p.title}));

    }
    async getSingleTag(id: string){
        const tag = await this.findTag(id);
        return {id: tag.id, title: tag.title};
    }

    private async findTag(id: string): Promise<Tag> {
        let tag;
        try{
            tag = await this.tagModel.findById(id).exec();
        }catch (error){
            throw new NotFoundException("Doesn't exist!");
        }
        if(!tag){
            throw new NotFoundException("Doesn't exist!");
        }
        return tag;
    }
}
