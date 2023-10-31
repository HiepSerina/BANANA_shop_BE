import {Body, Controller, Delete, Get, Param, Post, Query} from "@nestjs/common";
import {CartService} from "./cart.service";
import {CartDto} from "./cart.dto";

@Controller('cart')
export class CartController{
    constructor(private cartService:CartService) {
    }

    @Get('/:id')
    async getById(@Param('id') userId: string) {
        return await this.cartService.getCartOfUser(userId);
    }

    @Delete('delete')
    async deleteItemFromCart(@Query('id') id: string) {
        return await this.cartService.deleteItemFromCart(id);
    }

    @Post('create')
    async createOrder(@Body() cart: CartDto) {
        return await this.cartService.addItemToCart(cart);
    }
}
