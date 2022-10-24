import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Photo } from './photo.model'
import { Model } from "mongoose";

@Injectable()
export class PhotoService {
    private photo: Photo[] = [];
    constructor(@InjectModel('Photo') private readonly photoModel: Model<Photo>) {}

    async insertPhoto(title: string, tag: string,url: string) {
        const newPhoto = new this.photoModel({
            title,
            tag,
            url
        });
        const result = await newPhoto.save();
        return result.id as string;
    }
    async getProducts() {
         const restul = await this.photoModel.find().exec();
         return restul.map((p) => ({id: p.id, title: p.title, tag: p.tag, url: p.url}));

    }
    async getSinglePhoto(id: string){
        const photo = await this.findPhoto(id);
        return {id: photo.id, title: photo.title, tag: photo.tag, url: photo.url};
    }
    async updatePhoto(id: string, title: string, tag: string, url: string){
    const updatedPhoto = await this.findPhoto(id);
    if(title){
        updatedPhoto.title = title;
    }
    if(tag){
        updatedPhoto.tag = tag;
    }
    if(url){
        updatedPhoto.url = url;
    }
    updatedPhoto.save();
    }

    async deletePhoto(id: string){
        await this.photoModel.deleteOne({_id: id}).exec();
    }

    private async findPhoto(id: string): Promise<Photo> {
       let photo;
        try{
             photo = await this.photoModel.findById(id).exec();
        }catch (error){
            throw new NotFoundException("Doesn't exist!");
        }
        if(!photo){
            throw new NotFoundException("Doesn't exist!");
        }

        return photo;
    }
}
