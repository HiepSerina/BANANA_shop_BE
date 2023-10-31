import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User{
    @Prop({ required: true, unique:1 })
    userName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phoneNumber?: string | null;

    @Prop({ required: true })
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
