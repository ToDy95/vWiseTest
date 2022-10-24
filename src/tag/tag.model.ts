import * as mongoose from "mongoose";

export const TagSchema = new mongoose.Schema({
    title: {type: String, require: true, unique: true},
});

export interface Tag extends mongoose.Document {
    id: string,
    title: string,
}