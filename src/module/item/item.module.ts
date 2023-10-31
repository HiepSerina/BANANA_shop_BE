import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ItemService} from "./item.service";
import {ItemController} from "./item.controller";
import {ItemSchema} from "../../schemas";
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Item',
                schema: ItemSchema,
                collection: 'Item',
            },
        ]),
    ],
    exports: [MongooseModule],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule { }