import * as mongoose from "mongoose";

export const PhotoSchema = new mongoose.Schema({
    title: {type: String, require: true},
    tag: {type: String, require: true},
    url: String,
});

export interface Photo extends mongoose.Document {
    id: string,
    title: string,
    tag: string,
    url: string,
}