import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ItemDocument = Item & Document;

@Schema({ timestamps: true})
export class Item{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop()
    weaponCategory?: string;

    @Prop()
    weaponExterior?: string;

    @Prop()
    weaponFloat?: number;

    @Prop()
    weaponQuality: string;

    @Prop()
    category:string;

    @Prop()
    price: number;

    @Prop({ required: true, type: String, default: null })
    image: string | null;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

