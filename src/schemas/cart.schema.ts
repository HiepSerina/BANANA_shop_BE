import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart{
    @Prop({ required: true })
    idUser: string;

    @Prop({ required: true })
    idItem: string;

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true })
    itemName: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
