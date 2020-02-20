import mongoose from "mongoose";
import { ObjectID } from "bson";

export type HobbyDocument = mongoose.Document & {
    userId: ObjectID;
    name: string;
    year: number;
    passion: string;
};

const HobbySchema = new mongoose.Schema({
    userId: ObjectID,
    name: String,
    year: Number,
    passion: String,
}, { timestamps: true });



export const Hobby = mongoose.model<HobbyDocument>("Hobby", HobbySchema);
