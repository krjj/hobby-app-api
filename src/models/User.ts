import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    name: string;
};

const userSchema = new mongoose.Schema({
    name: {
        type : "string",
        unique : true
    },
}, { timestamps: true });



export const User = mongoose.model<UserDocument>("User", userSchema);
