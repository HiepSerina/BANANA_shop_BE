import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ItemModule} from "../item/item.module";
import {UserModule} from "../user/user.module";
import {CartController} from "./cart.controller";
import {CartService} from "./cart.service";
import {CartSchema} from "../../schemas";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Cart',
            schema: CartSchema,
            collection: 'Cart',
        },
    ]),
        ItemModule,
        UserModule
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
