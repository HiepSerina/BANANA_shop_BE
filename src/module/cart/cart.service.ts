import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Cart, CartDocument, Item, ItemDocument, User, UserDocument} from "schemas";
import {CartDto} from "./cart.dto";

@Injectable()
export class CartService{
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
    }
    async getItemById(id: any) {
        return this.itemModel.findById(id);
    }

    async getUserById(id: any):Promise<User> {
        return this.userModel.findById(id);
    }

    async addItemToCart(cart: CartDto) {
        const user  = await this.getUserById(cart.userId)
        const item = await this.getItemById(cart.itemId)
        const newCart = {
            idUser:cart.userId,
            idItem:cart.itemId,
            userName:user.userName,
            itemName:item.name,
        }
        return await this.cartModel.create(newCart)
    }

    async getCartOfUser(id: any) {
        return this.cartModel.find({idUser: id});
    }

    async deleteItemFromCart(id: any) {
        await this.cartModel.findByIdAndDelete(id);
        return 'Delete successfully'
    }
}